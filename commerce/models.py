from django.db import models
from django.utils.html import format_html

from accounts.models import UserAccount

# Create your models here.

class Categories(models.Model):
    name = models.CharField(max_length=700, unique=True)
    first_image = models.ImageField(upload_to="media/images/")
    date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def category_image(self):
        return format_html('<img src="{}" width="100">'.format(self.first_image.url))
    category_image.short_discription = "show images"
    first_image.allow_tags = True

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-date"]

# ______________________________________________________
class SubCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)
    first_image = models.ImageField(upload_to="media/images/")
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name="sub_category")
    date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def sub_category_image(self):
        return format_html('<img src="{}" width="100">'.format(self.first_image.url))
    sub_category_image.short_discription = "show images"
    first_image.allow_tags = True

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-date"]

# ______________________________________________________
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=455)
    category = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name="product")
    price = models.DecimalField(max_digits=7, decimal_places=2)
    first_image = models.ImageField(upload_to="media/images/")
    second_image = models.ImageField(upload_to="media/images/")
    third_image = models.ImageField(upload_to="media/images/")
    fourth_image = models.ImageField(upload_to="media/images/")

    date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)


    def product_image(self):
        return format_html('<img src="{}" width="100">'.format(self.first_image.url))
    product_image.short_discription = "show images"
    first_image.allow_tags = True

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-date"]



class Orders(models.Model):
    customer = models.ForeignKey(UserAccount, related_name='orders', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='orders', on_delete=models.CASCADE)
    # product = models.ManyToManyField(Product, related_name='orders')
    date_ordered = models.DateTimeField(auto_now_add=True)

    complete = models.BooleanField(default=False)

    qty = models.IntegerField(default=1)
    # total = models.DecimalField(max_digits=15, decimal_places=15, default=0)

    def __str__(self):
        return self.product.name
        # return self.customer.email
        # return self.customer.user.email

    def email(self):
        return self.customer.email

    def productName(self):
        return self.product.name

    def productPrice(self):
        return self.product.price

    def productImage(self):
        return self.product.image.url

    def totalPrice(self):
        return self.product.price * self.qty


class ShippingAddress(models.Model):
    customer = models.ForeignKey(UserAccount, related_name='shipping', on_delete=models.CASCADE)
    # order = models.ForeignKey(Orders, on_delete=models.CASCADE, related_name="ShippingAddress")
    order = models.ManyToManyField(Orders, related_name="ShippingAddress")
    phone = models.IntegerField()
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    payment_status = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.customer.email