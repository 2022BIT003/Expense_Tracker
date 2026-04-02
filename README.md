# 💰 Expense Tracker (MERN Stack)

A full-stack Expense Tracker web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to manage their income and expenses with powerful filtering, analytics, and Excel export features.

---

## 🚀 Features

### 🔐 Authentication & Security
- User Registration & Login with JWT Authentication
- Password hashing using bcryptjs
- Auto logout on token expiry (Axios interceptor)
- Protected routes using middleware
- Secure headers with Helmet & CORS configuration

---

### 👤 User Profile
- Avatar upload (JPG/PNG, <1.5MB)
- Base64 image storage in MongoDB
- Mandatory avatar setup after registration
- Profile display in Navbar

---

### 📊 Dashboard
- Central control panel for all transactions
- Real-time data updates based on filters

---

### 🔍 Advanced Filtering
- Filter by:
  - Last 7 days / Month / Year / Custom range
  - Transaction type (Income / Expense)
- Dynamic data fetching on filter change
- One-click reset option

---

### ➕ Transaction Management
- Add, Edit, Delete transactions
- Fields:
  - Title, Amount, Category, Description
  - Transaction Type (Credit / Expense)
  - Date picker
- Categories include:
  - Groceries, Rent, Salary, Food, Medical, Utilities, etc.

---

### 📋 Table View
- Responsive table layout
- Displays:
  - Date, Title, Amount, Category, Type
- Edit & Delete actions with icons

---

### 📊 Analytics View
- Interactive dashboard with:
  - Total Transactions
  - Total Turnover
  - Category-wise Income & Expense
- Custom SVG Doughnut Charts (no external library)
- Animated progress bars

---

### 📥 Excel Export
- Export filtered transactions to `.xlsx`
- Includes:
  - Date, Title, Amount, Type, Category, Description
- Auto file naming with date

---

### 🔔 Notifications
- Toast notifications using React-Toastify
- Real-time feedback for:
  - Success, Errors, Validation

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Bootstrap
- Material UI Icons
- Axios
- React-Toastify
- tsparticles

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Authentication
- JWT (JSON Web Token)
- bcryptjs

---
