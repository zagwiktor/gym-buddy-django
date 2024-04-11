from django.urls import path
from .views import LoginUser, RegisterUser, LogoutUser

urlpatterns = [
    path('login/', LoginUser.as_view(), name='login'),
    path('logout/', LogoutUser.as_view(), name='logout'),
    path('register/', RegisterUser.as_view(), name='register'),
]
