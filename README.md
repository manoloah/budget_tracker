
# 🧾 Budget Tracker Backend (Django + PostgreSQL)

This is the backend for a personal or family finance tracker built with Django and Django REST Framework. It helps automate the process of uploading, categorizing, and analyzing transactions, and comparing them to a monthly budget.

---

## 🚀 Features

- Upload bank statements (CSV or Excel) for any account
- Automatically extract metadata and normalize transactions
- Tag transactions using the first 12 characters of their description
- Match them to a predefined category dictionary or recategorize manually
- View monthly budget vs actual spending reports
- Store category rules and persist across sessions
- API ready for integration with a React frontend

---

## 📁 Setup Instructions

### 1. Clone and Install
```bash
git clone https://github.com/manoloah/budget_tracker.git
cd budget_tracker
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

### 2. Configure Environment
Create a `.env` file in the root folder:

```env
DB_NAME=budget_tracker_db
DB_USER=your_mac_username
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
```

### 3. Setup Database
Make sure PostgreSQL is running locally, then:

```bash
createdb budget_tracker_db
python manage.py makemigrations
python manage.py migrate
```

### 4. Run Locally
```bash
python manage.py runserver
```

---

## 🔌 API Endpoints

| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| POST   | `/upload/transactions/`   | Upload multiple transaction files    |
| POST   | `/upload/budget/`         | Upload monthly budget categories     |
| GET    | `/report/?month=YYYY-MM`  | Get budget vs actual for a month     |
| POST   | `/recategorize/`          | Re-assign tag to a category          |

---

## 🛠 Built With

- Django + DRF
- PostgreSQL
- pandas
- CORS support for React
- CSV/XLSX transaction parsing

---

## 📈 Next Up

- Frontend integration with React
- Machine learning-based auto-categorization
- Auth, multi-user support
