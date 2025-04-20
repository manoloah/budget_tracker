from django.db import models

# This model represents a category used to group transactions (e.g., groceries, rent, etc.)
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Name of the category, must be unique

    def __str__(self):
        return self.name

# This model represents a financial transaction (from a bank statement, credit card, etc.)
class Transaction(models.Model):
    date = models.DateField()  # Date of the transaction
    description = models.CharField(max_length=255)  # Vendor or transaction details
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Transaction amount
    source = models.CharField(max_length=100)  # Name of the source file/account this transaction came from
    tag = models.CharField(max_length=50)  # First 12 characters of the description, used for categorization
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)  # Linked category

    def __str__(self):
        return f"{self.date} - {self.description}"