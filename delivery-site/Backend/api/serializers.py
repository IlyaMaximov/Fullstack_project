from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ['username', 'password']
		write_only_fields = ('password', )


class OrderSerializer(serializers.ModelSerializer):

	class Meta:
		model = Order
		fields = '__all__'


class PersonLoginSerializer(serializers.ModelSerializer):

	class Meta:
		model = Person
		fields = ['login']


class PersonInfoSerializer(serializers.ModelSerializer):

	class Meta:
		model = Person
		fields = ['login', 'user_name',  'hostel_num', 'room_num']


class PersonSerializer(serializers.ModelSerializer):
	orders = OrderSerializer(many=True, read_only=True)

	class Meta:
		model = Person
		fields = '__all__'
