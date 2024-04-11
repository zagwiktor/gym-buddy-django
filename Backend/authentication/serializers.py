from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email','first_name','last_name','password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self,validated_data):
        user = User(email=validated_data['email'],username=validated_data['username'],first_name=validated_data["first_name"],last_name=validated_data["last_name"])
        user.set_password(validated_data['password'])
        user.save()
        return user

    def validate(self, data):
        if len(data["username"]) < 7 or len(data["username"]) >= 15: 
            raise serializers.ValidationError({'erros': 'Username must contain between 8 and 15 characters.'})
        return data
    
    def validate_password(self, data):
        validate_password(data) 
        return data
        
        