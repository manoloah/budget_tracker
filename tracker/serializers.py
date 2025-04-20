from rest_framework import serializers
from .models import Transaction, Category

# Serializer for the Category model (used for reading/writing category data in API)
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# Serializer for the Transaction model
class TransactionSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)  # Include nested category data in output

    class Meta:
        model = Transaction
        fields = '__all__'