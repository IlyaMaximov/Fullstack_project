# Generated by Django 3.1.4 on 2020-12-15 09:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20201212_1909'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='person',
            name='password',
        ),
    ]
