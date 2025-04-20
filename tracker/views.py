# tracker/views.py
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Transaction, Category
from .serializers import TransactionSerializer
from django.db.models import Sum

# Handles uploading bank or credit card transactions in CSV/XLSX format
class UploadTransactions(APIView):
    def post(self, request):
        files = request.FILES.getlist("files")  # Accept multiple uploaded files
        for f in files:
            # Read CSV or Excel into a pandas DataFrame
            df = pd.read_csv(f) if f.name.endswith(".csv") else pd.read_excel(f)
            for _, row in df.iterrows():
                # Attempt to normalize different formats
                date = pd.to_datetime(row.get("fecha") or row.get("date"), errors="coerce")
                desc = row.get("descripcion") or row.get("description")
                amt = pd.to_numeric(row.get("monto") or row.get("amount"), errors="coerce")
                if pd.isna(date) or pd.isna(desc) or pd.isna(amt):
                    continue  # Skip invalid rows
                tag = str(desc).lower().strip()[:12]  # Use first 12 characters for auto-categorization

                # Create a new transaction record
                Transaction.objects.create(
                    date=date,
                    description=desc,
                    amount=abs(amt),
                    source=f.name,
                    tag=tag
                )
        return Response({"message": "Transactions uploaded."}, status=status.HTTP_200_OK)

# Handles uploading the monthly budget categories (usually one entry per category)
class UploadBudget(APIView):
    def post(self, request):
        file = request.FILES["file"]
        df = pd.read_csv(file) if file.name.endswith(".csv") else pd.read_excel(file)
        for _, row in df.iterrows():
            cat_name = str(row.get("Categorias") or row.get("category")).strip()
            Category.objects.get_or_create(name=cat_name)  # Add to DB if not already present
        return Response({"message": "Budget categories uploaded."}, status=status.HTTP_200_OK)

# Provides budget vs actuals report for a given month (YYYY-MM)
class ReportView(APIView):
    def get(self, request):
        month_str = request.query_params.get("month")
        if not month_str:
            return Response({"error": "Month is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            target = pd.Period(month_str)  # e.g. 2025-04
            queryset = Transaction.objects.filter(date__month=target.month, date__year=target.year)
            results = queryset.values("category__name").annotate(total=Sum("amount"))  # Group by category
            return Response(list(results))
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Allows user to re-categorize all transactions with a given tag
class Recategorize(APIView):
    def post(self, request):
        tag = request.data.get("tag", "").lower().strip()
        new_category = request.data.get("new_category", "").strip()
        if not tag or not new_category:
            return Response({"error": "Both tag and new_category are required."}, status=status.HTTP_400_BAD_REQUEST)
        cat, _ = Category.objects.get_or_create(name=new_category)
        Transaction.objects.filter(tag=tag).update(category=cat)
        return Response({"message": f"Updated tag '{tag}' to category '{new_category}'"})