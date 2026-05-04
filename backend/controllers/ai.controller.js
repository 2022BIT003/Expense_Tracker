import { getGeminiModel } from "../utils/gemini.utils.js";
import Transaction from "../models/transaction.model.js";

export const queryTransactions = async (req, res) => {
    try {
        const { query } = req.body;
        const userId = req.user._id;

        if (!query) {
            return res.status(400).json({ success: false, message: "Query is required" });
        }

        const model = getGeminiModel();

        const prompt = `
        You are an expert at converting natural language questions into MongoDB filter objects for an expense tracker application.
        The schema for a transaction is:
        - title: String
        - amount: Number
        - category: String
        - description: String
        - transactionType: String ("income" or "expense")
        - date: Date
        - user: ObjectId

        The current user's ID is: ${userId}
        Current date is: ${new Date().toISOString()}

        Rules:
        1. ALWAYS include the user ID in the filter: { "user": "${userId}" }.
        2. Return ONLY a valid JSON object representing the MongoDB filter.
        3. Do not include any explanations, markdown code blocks, or text other than the JSON object.
        4. If you cannot understand the query, return { "user": "${userId}" }.
        5. For date ranges, use $gte and $lte with ISO date strings.
        6. For categories or titles, you can use $regex with "i" option for case-insensitive matching.

        User Question: "${query}"
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();

        let filter;
        try {
            // Remove markdown code blocks if present
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            filter = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);
            
            // Ensure userId is present and correct (safety check)
            filter.user = userId;
        } catch (e) {
            console.error("Failed to parse Gemini response as JSON:", responseText);
            filter = { user: userId };
        }

        const transactions = await Transaction.find(filter).sort({ date: -1 });

        // Now ask Gemini to summarize the results
        const summaryPrompt = `
        The user asked: "${query}"
        Here are the transactions found in their expense tracker: ${JSON.stringify(transactions.slice(0, 50))}
        (Total found: ${transactions.length})

        Provide a concise summary or answer to the user's question based on these transactions.
        If no transactions were found, say so politely.
        Be specific with numbers and categories if applicable.
        `;

        const summaryResult = await model.generateContent(summaryPrompt);
        const summary = summaryResult.response.text().trim();

        return res.status(200).json({
            success: true,
            summary,
            transactions,
        });

    } catch (error) {
        console.error("AI Query Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const scanReceipt = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No receipt image uploaded" });
        }

        const model = getGeminiModel();
        
        // Convert buffer to base64
        const imageData = req.file.buffer.toString("base64");
        const mimeType = req.file.mimetype;

        const prompt = `
        You are an expert at extracting financial data from receipts.
        Analyze the provided image and extract the following fields into a JSON object:
        - title: The name of the merchant or store.
        - amount: The total amount paid. 
            * IMPORTANT: If the receipt is in a currency other than Indian Rupees (INR), like USD, EUR, etc., detect the currency and CONVERT the amount to INR using the current approximate exchange rate.
            * Return the amount as a number in INR.
        - date: The date of the transaction in YYYY-MM-DD format.
        - category: Categorize the expense into one of these: Food, Transport, Bills, Shopping, Entertainment, Health, Other.
        - description: A short description of what was purchased.
        - transactionType: Always "expense".

        Rules:
        1. Return ONLY a valid JSON object.
        2. Do not include markdown code blocks.
        3. BE PROACTIVE: If a field is not explicitly clear, use visual cues to estimate it (e.g., if you see a logo but no text, use the logo name for 'title'). Try to fill every field.
        4. If amount is in a foreign currency, do the math and provide the final INR value.
        5. Ensure the date is valid. If not found, use the current date: ${new Date().toISOString().split('T')[0]}.
        `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageData,
                    mimeType: mimeType
                }
            }
        ]);

        const responseText = result.response.text().trim();
        let extractedData;
        
        try {
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            extractedData = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);
        } catch (e) {
            console.error("Failed to parse Gemini Vision response:", responseText);
            return res.status(500).json({ success: false, message: "Could not parse receipt data" });
        }

        return res.status(200).json({
            success: true,
            data: extractedData
        });

    } catch (error) {
        console.error("AI Scan Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
