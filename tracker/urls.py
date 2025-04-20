# tracker/urls.py
from django.urls import path
from .views import UploadTransactions, UploadBudget, ReportView, Recategorize

# Routing for the tracker app
urlpatterns = [
    path('upload/transactions/', UploadTransactions.as_view()),  # POST: Upload CSV/XLSX
    path('upload/budget/', UploadBudget.as_view()),  # POST: Upload categories/budget
    path('report/', ReportView.as_view()),  # GET: Return monthly budget vs actuals
    path('recategorize/', Recategorize.as_view()),  # POST: Update category for a given tag
]
