
# ✅ Budget Tracker App — Project Summary & Setup Instructions

---

## 📦 Project Structure

You’re building a **Copilot-inspired family finance tracker** with:
- ✅ **Django + PostgreSQL backend** for transactions, categories, budgets, reports
- ✅ **Next.js + Tailwind + Recharts frontend**, styled after Copilot (dark UI, sidebar layout)
- ✅ React frontend pulls real data from backend API and shows budget vs actuals
- ✅ CSV/XLSX uploads supported from the frontend

---

## 1. 🔧 Backend (Python / Django)

### ✅ Stack:
- Django
- Django REST Framework
- PostgreSQL
- Pandas
- `python-decouple` for environment variables

### ✅ Features:
- Upload transaction CSV/XLSX files
- Extract metadata and assign source
- Normalize and tag transactions
- Persist category dictionary (via `catalog.csv`)
- Budget vs Actual report
- Recategorize transactions by tag

### ✅ Key Endpoints:
| Method | Route                        | Purpose                          |
|--------|-----------------------------|----------------------------------|
| POST   | `/api/upload/transactions/` | Upload multiple transaction files |
| POST   | `/api/upload/budget/`       | Upload categories                |
| GET    | `/api/report/?month=YYYY-MM`| Monthly budget vs actual report |
| GET    | `/api/transactions/?month=` | Raw transaction list             |
| POST   | `/api/recategorize/`        | Update a tag’s category          |

### ✅ Local Setup:
```bash
python -m venv env
source env/bin/activate
pip install -r requirements.txt

# create .env
DB_NAME=budget_tracker_db
DB_USER=your_mac_username
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432

createdb budget_tracker_db
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

---

## 2. 💻 Frontend (React + Next.js + Tailwind)

### ✅ Stack:
- React + Next.js (Pages Router)
- Tailwind CSS
- Recharts (visualizations)
- Axios (API communication)
- Lucide Icons

### ✅ Features Built:
- Sidebar layout with dashboard-style nav
- Transactions list from API
- Bar chart showing budget vs actuals
- CSV/XLSX upload screen
- All styled in dark mode like Copilot

### ✅ Key Files:

```bash
src/
├── pages/
│   ├── index.tsx          # Dashboard (Bar chart)
│   ├── transactions.tsx   # Table of categorized transactions
│   ├── upload.tsx         # Upload screen for bank files
│   └── _app.tsx           # Wraps layout + Sidebar
├── components/
│   └── Sidebar.tsx
├── styles/
│   └── globals.css
tailwind.config.js
```

### ✅ Tailwind Config (must be root-level)

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0e1014',
        primary: '#00e0d1',
        danger: '#ff5c5c',
      },
    },
  },
  plugins: [],
}
```

---

## 3. 🛠 Known Fixes & Gotchas

- If `bg-background` fails → check `tailwind.config.js` is in the root, and restart `npm run dev`
- If `npx tailwindcss init` fails → you don’t need it if the config is written manually
- If upload fails → make sure `corsheaders` is in Django’s `MIDDLEWARE` and `CORS_ALLOWED_ORIGINS` includes `http://localhost:3000`

---

## 4. 🔗 GitHub

- Backend & frontend are stored at:
  `https://github.com/manoloah/budget_tracker.git`

---

## 🔜 Next Steps You Can Add

1. Filter dashboard & transactions by month
2. Color badges for categories
3. Pie chart visualization
4. View by account (Amex vs BBVA)
5. Add authentication (JWT or Clerk)
6. ML categorization (auto-tag using OpenAI or scikit-learn)
