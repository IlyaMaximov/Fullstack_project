from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, mixins, permissions
from django.contrib.auth.models import User


###################     User Views     ###################
class UserView(viewsets.GenericViewSet, mixins.CreateModelMixin):
	permission_classes = (AllowAny, )
	serializer_class = UserSerializer
	queryset = User.objects.all()

	def perform_create(self, serializer):
		user = User.objects.create_user(**serializer.validated_data)



###################     Order Views     ###################
class OrderList(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		orders = Order.objects.all()
		serializer = OrderSerializer(orders, many=True)
		return Response(serializer.data)

	def post(self, request):
		serializer = OrderSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors)


class OrderDetail(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, id):
		orders = Order.objects.filter(id = id)
		serializer = OrderSerializer(orders, many=True)
		return Response(serializer.data)

	def delete(self, request, id):
		serializer = Order.objects.filter(id = id)
		deleted_cnt = len(serializer)
		serializer.delete()
		if (deleted_cnt != 0):
			return Response({"success":"Order with id : '{}' deleted successfully".format(id)})
		return Response({"fail":"No order with id : '{}'".format(id)})


class PersonOrders(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, login):
		orders = Order.objects.all().filter(person = login)
		serializer = OrderSerializer(orders, many=True)
		return Response(serializer.data)



###################	PersonLogin Views	###################		
class PersonLoginList(APIView):

	def get(self, request):
		persons = Person.objects.all()
		serializer = PersonLoginSerializer(persons, many=True)
		return Response(serializer.data)



###################	PesonInfo Views	###################		
class PersonInfo(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, login):
		persons = Person.objects.all().filter(login = login)
		serializer = PersonInfoSerializer(persons, many=True)
		return Response(serializer.data)



###################	Peson Views	###################
class PersonList(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		persons = Person.objects.all()
		serializer = PersonSerializer(persons, many=True)
		return Response(serializer.data)

	def post(self, request):
		serializer = PersonSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors)


class PersonDetail(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, login):
		persons = Person.objects.all().filter(login = login)
		serializer = PersonSerializer(persons, many=True)
		return Response(serializer.data)

	def delete(self, request, login):
		Person.objects.filter(login = login)
		serializer = Person.objects.filter(login = login)
		deleted_cnt = len(serializer)
		serializer.delete()
		if (deleted_cnt != 0):
			return Response({"success":"Person with login : '{}' deleted successfully".format(login)})
		return Response({"fail":"No person with login : '{}'".format(login)})
