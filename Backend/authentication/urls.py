from django.urls import path
from .views import LoginUser, RegisterUser, LogoutUser

urlpatterns = [
    path('login/', LoginUser.as_view()),
    path('logout/', LogoutUser.as_view()),
    path('register/', RegisterUser.as_view()),
]
