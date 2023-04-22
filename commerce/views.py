from django.shortcuts import render
from rest_framework import viewsets, filters, pagination
from commerce.models import Product, Orders, ShippingAddress, Categories, SubCategory
from commerce.serializers import ProductSerializers, OrdersSerializers, ShippingAddressSerializers, CategorySerializers, SubCategorySerializers
# from rest_framework.authentication import TokenAuthentication

# import django_filters.rest_framework
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import filters


from accounts.models import UserAccount
from accounts.serializers import UserCreateserializer

# from rest_framework.authentication import TokenAuthentication
# from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly


# Create your views here.
class ProductPagination(pagination.PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 1000



class CategoryViewSets(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializers
    permission_classes = [IsAuthenticatedOrReadOnly]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name']
    search_fields = ['name'] #http://127.0.0.1:8000/api/products/?search=dell   just write any char in name no need full name


class SubCategoryViewSets(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializers
    permission_classes = [IsAuthenticatedOrReadOnly]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name','category']
    search_fields = ['name','category'] #http://127.0.0.1:8000/api/products/?search=dell   just write any char in name no need full name



class ProductViewSets(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
    pagination_class = ProductPagination
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    permission_classes = [IsAuthenticatedOrReadOnly]


    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name','category','id']  #http://127.0.0.1:8000/api/products/?category=1
    search_fields = ['name']



class OrdersViewSets(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializers
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['customer__email', 'id']
    search_fields = ['customer__email','id']




class ShippingViewSets(viewsets.ModelViewSet):
    queryset = ShippingAddress.objects.all()
    serializer_class = ShippingAddressSerializers
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['customer__email', 'id']
    search_fields = ['customer__email','id']


class UserAccountViewSets(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateserializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    permission_classes = [IsAuthenticated]
    filterset_fields = ['email']
    search_fields = ['email']




# ______________________Send Email_________________________________
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse

# def send(request):
#     res =  send_mail('Order Confirmed', 'Here is the message.', settings.EMAIL_HOST_USER, ['arfsociety07@gmail.com'])
#     return JsonResponse(res, safe=False)

def send(request, productName, mail):
    res =  send_mail('Order Confirmed', f'Thank you for ordering a product {productName} from Keycodx.com', settings.EMAIL_HOST_USER, [mail])
    return JsonResponse(res, safe=False)



# ______________________Send Email_________________________________