
# 🚀 Fullstack Dashboard App

Sebuah aplikasi dashboard sederhana menggunakan **Next.js (Frontend)**, **FastAPI (Backend)**, dan **PostgreSQL (Database)**.  
Dirancang untuk manajemen data customer dengan autentikasi admin, fitur CRUD, dan terintegrasi menggunakan **Docker Compose**.

---

## 🧱 Tech Stack

- ⚙️ FastAPI (Python 3.10) – Backend REST API + JWT Auth
- 🎨 Next.js + Tailwind CSS – Frontend Admin Dashboard
- 🐘 PostgreSQL – Penyimpanan data customer dan admin
- 🐳 Docker Compose – Deploy fullstack stack dengan mudah

---

## 📦 Fitur Utama

- ✅ Register & Login Admin
- ✅ CRUD Customer (Create, Read, Update, Delete)
- ✅ JWT Autentikasi
- ✅ UI Dashboard Responsive dengan Tailwind
- ✅ Environment configurable (`.env`)
- ✅ Siap deploy ke VPS (port 80, 8000, 5432)

---

## 🚀 Cara Menjalankan (Docker)

### 1. Build & Run

```bash
docker-compose up --build
```

### 2. Akses

| Layanan   | URL                  |
|-----------|----------------------|
| Frontend  | http://localhost:3000 |
| Backend   | http://localhost:8000 |
| Database  | localhost:5432       |

---

## ⚙️ Mode Development (Live Reload)

```bash
# Frontend dev mode
docker-compose -f docker-compose.override.yml up

# Atau langsung (Next.js)
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing (FastAPI)

```bash
# Aktifkan virtualenv
cd backend
source venv/bin/activate

# Jalankan pytest
ENV=test pytest tests
```

> Pastikan PostgreSQL lokal aktif di `localhost:5432` untuk testing lokal.

---

## 🔐 Environment Variables

### `.env` (global untuk Docker Compose)
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
SECRET_KEY=supersecretkey
ENV=docker
```

### `backend/.env` (untuk local run)
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
SECRET_KEY=supersecretkey
```

### `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📁 Struktur Folder

```
fullstack-dashboard/
├── backend/               # FastAPI source
│   ├── main.py
│   ├── database.py
│   ├── models/
│   ├── schemas/
│   ├── routers/
│   └── tests/
├── frontend/              # Next.js frontend
│   ├── pages/
│   ├── styles/
│   └── lib/
├── .env
├── docker-compose.yml
└── README.md
```

---

## 📌 License

MIT License – silakan gunakan, ubah, dan kembangkan sesuai kebutuhanmu 🚀
