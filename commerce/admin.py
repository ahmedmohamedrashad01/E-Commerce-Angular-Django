from django.contrib import admin
from commerce import models
# Register your models here.

admin.site.site_header = 'Ahmed Rashad'
admin.site.site_title = 'Ahmed Rashad'

class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name","category_image","is_active")

class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ("name","category","sub_category_image","is_active")

class ProductAdmin(admin.ModelAdmin):
    list_display = ("name","description","category","price", "product_image","is_active")


class OrdersAdmin(admin.ModelAdmin):
    list_display = ("email","product","date_ordered","qty","totalPrice")


class ShippingAddressAdmin(admin.ModelAdmin):
    # list_display = ("order","address","city","state")
    list_display = ("customer","address","city","state")




# class CustomerAdmin(admin.ModelAdmin):
#     list_display = ("id","user","name","email")


admin.site.register(models.Categories, CategoryAdmin)
admin.site.register(models.SubCategory, SubCategoryAdmin)

admin.site.register(models.Product, ProductAdmin)
admin.site.register(models.Orders, OrdersAdmin)
admin.site.register(models.ShippingAddress, ShippingAddressAdmin)
# admin.site.register(models.Customer, CustomerAdmin)




