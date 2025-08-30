# 📝 Todo App (FastAPI + React + MongoDB)

A full-stack Todo application built with:

- **Frontend:** React 19 + Vite + Axios
- **Backend:** FastAPI + PyMongo
- **Database:** MongoDB

---

## 📂 Project Structure

todo-project/
│
├── backend/
│ ├── main.py # FastAPI backend
│ ├── requirements.txt # Python dependencies
│ └── .gitignore
│
├── frontend/
│ ├── index.html # Vite entry point
│ ├── src/ # React components
│ ├── package.json # Frontend dependencies
│ ├── vite.config.js # Vite config
│ ├── eslint.config.js # ESLint config
│ └── .gitignore
│
└── README.md # Project documentation

---

## 🚀 Getting Started

### 🔹 Backend (FastAPI + MongoDB)

1. Navigate to backend folder:

   ```bash
   cd backend

   ```

2. Create a virtual environment:

   ```python -m venv .venv
   .venv\Scripts\activate

   ```

3. Install dependencies:

   ```pip install -r requirements.txt

   ```

4. Start the FastAPI server:

   ```uvicorn main:app --reload

   ```

5. The backend will run at: http://localhost:8000

### 🔹 Frontend (React + Vite)

1. Navigate to frontend folder:

   ```cd frontend

   ```

2. Install dependencies:

   ```npm install

   ```

3. Run development server:

   ```npm run dev

   ```

4. The frontend will run at: http://localhost:5173

### 🌐 API Endpoints (FastAPI)

- POST /todos/ → Add a new todo
- GET /todos/ → Get all todos
- DELETE /todos/{id} → Delete a todo

### ✨ Features

- Add, delete todos
- Store todos in MongoDB
- REST API powered by FastAPI
- React UI with Axios for API calls

### 📌 Requirements

- Python 3.10+
- Node.js 18+
- MongoDB running locally or via MongoDB Atlas

### 🛠️ Future Improvements

- Edit/update todo items  
- User authentication  
- Deploy to cloud (Render/Heroku + Vercel/Netlify)  
