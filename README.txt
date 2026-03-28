# CRM Dashboard

Full-stack CRM analytics dashboard built with FastAPI and React + Vite.

## Stack
FastAPI • React • Vite • Pandas • Recharts

## Run

### Backend
```bash
cd crm-backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd crm-frontend
npm install
npm run dev
```

Backend: `http://127.0.0.1:8000`  
Frontend: `http://localhost:5173`