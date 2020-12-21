from django.db import models
from django.contrib.auth.models import User

class Person(models.Model):
	login = models.CharField(max_length=32, primary_key=True)
	user_name = models.CharField(max_length=32)
	hostel_num = models.PositiveIntegerField()
	room_num = models.PositiveIntegerField()

	def __str__(self):
		return self.login


class Order(models.Model):
	store_name = models.CharField(max_length=64)
	products = models.CharField(max_length=128)
	gratuity = 	models.PositiveIntegerField()
	person = models.ForeignKey(Person, related_name='orders', on_delete=models.CASCADE)

	def __str__(self):
		return self.store_name
