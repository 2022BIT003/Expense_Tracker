export const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const AI_ENDPOINTS = {
  QUERY: `${API_BASE_URL}/api/v1/ai/query`,
  INSIGHTS: `${API_BASE_URL}/api/v1/ai/insights`,
};
