# 🤖 AI Prompt Library

A full-stack AI Prompt Management application built with **React, TypeScript, Express, and MongoDB**.

AI Prompt Library allows users to create, manage, organize, and reuse AI prompts with features like search, filtering, favorites, pinning, duplication, import/export, and a clean dashboard experience.

---

## 🚀 Features

### Prompt Management
- ✅ Create new prompts
- ✅ View all prompts
- ✅ Edit existing prompts
- ✅ Delete prompts with confirmation dialog
- ✅ Duplicate prompts
- ✅ Copy prompts to clipboard
- ✅ Pin important prompts
- ✅ Mark prompts as favorites

### Organization
- ✅ Search prompts
- ✅ Filter by category
- ✅ Sort prompts
- ✅ Favorite-only view
- ✅ Recent prompt management

### UI/UX
- ✅ Responsive dashboard design
- ✅ Sidebar navigation
- ✅ Navbar layout
- ✅ Dashboard cards
- ✅ Toast notifications
- ✅ Loading states
- ✅ Form validation
- ✅ Keyboard shortcut (`Ctrl + K` for search)

### Import / Export
- ✅ Export prompts as JSON
- ✅ Import prompts from JSON files

### Drag & Drop
- ✅ Prompt card drag handle support

---

# 🛠️ Tech Stack

## Frontend

- React.js
- TypeScript
- Vite
- Tailwind CSS
- React Hook Form
- Zod
- Axios
- Lucide React
- Sonner Toast

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

## Tools

- Git & GitHub
- Postman
- MongoDB Atlas

---

# 📂 Project Structure

```
AI-Prompt-Library
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── common
│   │   │   ├── dashboard
│   │   │   ├── layout
│   │   │   ├── prompt
│   │   │   └── ui
│   │   │
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── types
│   │   └── utils
│
└── backend
    ├── src
    │   ├── controllers
    │   ├── models
    │   ├── routes
    │   └── server.ts
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/yashsahane-eng/AI-Prompt-Library.git
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

# 🔌 API Endpoints

## Get All Prompts

```
GET /api/prompts
```

## Get Prompt By ID

```
GET /api/prompts/:id
```

## Create Prompt

```
POST /api/prompts
```

## Update Prompt

```
PUT /api/prompts/:id
```

## Delete Prompt

```
DELETE /api/prompts/:id
```

---

# 🧩 Application Flow

```
React Frontend

      |
      | Axios API Requests

      ↓

Express Backend

      |
      | Mongoose

      ↓

MongoDB Atlas Database
```

---

# 📸 Screenshots

Add application screenshots here:

```


```

<img width="1341" height="683" alt="image" src="https://github.com/user-attachments/assets/f31ca6fb-0604-4d75-b34e-96d01e760c05" />


---

# 🎯 Future Improvements

- User authentication with JWT
- User-specific prompt collections
- AI prompt improvement suggestions
- Prompt sharing
- Cloud deployment
- Dark/Light mode

---

# 👨‍💻 Author

**Yash Sahane**

Built with React, TypeScript, Node.js and MongoDB.
