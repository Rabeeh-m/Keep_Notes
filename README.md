# Keep Notes
A simple Note Taker application built with **Django (backend)** and **Vite React (frontend)**.

## Features
- User authentication (Login/Register)
- Add, edit, delete, and view notes
- Secure API endpoints with authentication
- Responsive UI with React

---

## Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/Keep_Notes.git
cd Keep_Notes
```

### 2️⃣ Setup Backend (Django)

- Create Virtual Environment
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # For Linux/Mac
venv\Scripts\activate  # For Windows
```

- Install Dependencies
```bash
pip install -r requirements.txt
```

- Apply Migrations
```bash
python manage.py migrate
```

- Apply Migrations
```bash
python manage.py runserver
```

### 2️⃣ Setup Frontend (Vite + React)

- Install Dependencies
```bash
cd frontend
npm install
```

- Start Development Server
```bash
npm run dev
```

## ⚡ API Endpoints

| Method     | Endpoint          | Description        | Authentication|
|------------|-------------------|--------------------|--------------|
| **POST**   | `/api/login/`     | User login         | ❌ No        |
| **POST**   | `/api/signup/`    | User registration  | ❌ No        |
| **GET**    | `/api/notes/`     | Get all user notes | ✅ Yes       |
| **POST**   | `/api/notes/`     | Create a new note  | ✅ Yes       |
| **PUT**    | `/api/notes/:id/` | Update a note      | ✅ Yes       |
| **DELETE** | `/api/notes/:id/` | Delete a note      | ✅ Yes       |
