from django.urls import path
from .views import *
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from rest_framework import routers
from django.urls import path, include


router = routers.DefaultRouter()
router.register(r'users', UserView)



urlpatterns = [
	path('orders/', OrderList.as_view()),                            # all orders
    path('orders/<login>/', PersonOrders.as_view()),                 # all orders for person
	path('order/<int:id>/', OrderDetail.as_view()),                  # order by ID

    path('persons/', PersonList.as_view()),                          # all persons
    path('persons/logins/', PersonLoginList.as_view()),                   # logins of all persons
    path('person/<login>/', PersonDetail.as_view()),                 # person by ID
    path('person_info/<login>/', PersonInfo.as_view()),              # person by ID (without orders)

    path('', include(router.urls)),                                   # users adding
    path('auth/token/', jwt_views.TokenObtainPairView.as_view()),     # get token
    path('auth/token/verify/', jwt_views.TokenVerifyView.as_view()),  # verify token
    path('auth/token/refresh/', jwt_views.TokenRefreshView.as_view()) # refresh token
]
