from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, logout, login
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework import status, generics
from rest_framework.response import Response
from .serializers import UserSerializer
# Create your views here.
class LoginUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if username is not None and password is not None:
            user = authenticate(username=username,password=password)
        if not user:
            return Response({'error' : 'Invalid credentials!'},status=status.HTTP_400_BAD_REQUEST)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'message': f'Logged in succesfully!'}, status=status.HTTP_200_OK)
    
        
class LogoutUser(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        authentication_token = request.META.get('HTTP_AUTHORIZATION')
        token_key = authentication_token.split(' ')[1]
        try:
            token = Token.objects.get(key=token_key)
            token.delete()
            logout(request=request)
            return Response({'message': 'You had been logged out!'}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class RegisterUser(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserSerializer