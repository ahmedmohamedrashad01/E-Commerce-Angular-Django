from dataclasses import fields
from rest_framework import serializers
from commerce.models import Product, Orders, ShippingAddress, Categories, SubCategory

from accounts.serializers import UserCreateserializer

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id', 'name', 'first_image', "is_active"]

class SubCategorySerializers(serializers.ModelSerializer):
    # category = CategorySerializers(many=True)
    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'first_image', "is_active","category"]

        def to_representation(self, instance):
            data = super().to_representation(instance)
            data["category"] = CategorySerializers(instance.category).data
            return data

class ProductSerializers(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id","name","description","category","price","first_image","second_image","third_image","fourth_image","is_active"]
    def to_representation(self, instance):
            data = super().to_representation(instance)
            data["category"] = SubCategorySerializers(instance.category).data
            return data

class OrdersSerializers(serializers.ModelSerializer):
    # customer = UserCreateserializer()

    class Meta:
        model = Orders
        fields = ["id","customer","product","date_ordered","complete","qty","totalPrice"]
        read_only_fields = ['id']


    def to_representation(self, instance):
            data = super().to_representation(instance)
            data["product"] = ProductSerializers(instance.product).data
            return data





class ShippingAddressSerializers(serializers.ModelSerializer):
    order = OrdersSerializers(many=True)
    class Meta:
        model = ShippingAddress
        fields = ["id","customer","order","phone","address","city","state","created","updated","payment_status"]

        # def to_representation(self, instance):
        #     data = super().to_representation(instance)
        #     data["order"] = OrdersSerializers(instance.order).data
        #     return data
