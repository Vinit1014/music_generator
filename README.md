#  Wubble QuickTune – AI Music Generator

Wubble QuickTune is a simple full-stack application that lets users generate and play AI-powered music based on mood and genre preferences.

Deployed url: https://music-generator-sigma.vercel.app/
NOTE: App may take for first time a bit longer time to fetch the genres and moods from backend. Kindly wait
## 🚀 Features

- 🎧 Generate tracks based on selected mood and genre
- ❤️ Like/unlike tracks with persistent local storage
- 🔄 Recently played tracks section
- 🎼 Smooth UI with TailwindCSS & Framer Motion
- 🎯 Built with React + Zustand + Express.js

---

## 📁 Project Structure

```

music\_generator/
├── backend/
│   ├── index.js          # Express API server
│   └── .env              # Contains FRONTEND\_BASE\_URL
├── frontend/
│   ├── public/assets/    # Audio files
│   ├── src/              # React components and store
│   └── .env              # Contains VITE\_BACKEND\_URL
└── README.md             # This file

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Vinit1014/music_generator.git
cd music_generator
````

---

### 2. Backend Setup (Express)

```bash
cd backend
npm install
```

Create a `.env` file:

```env
FRONTEND_BASE_URL=http://localhost:5173
```

Run the server:

```bash
nodemon index.js
```

---

### 3. Frontend Setup (Vite + React)

```bash
cd ../frontend
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_API=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

##  Key Design Decisions

* Used **Zustand** for state management due to its simplicity and performance
* Used **Framer Motion** for smooth UI animations
* Tracks are mocked via backend and filtered on demand
* Liked & recent tracks are persisted using `localStorage`

---

