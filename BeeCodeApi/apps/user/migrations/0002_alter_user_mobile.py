# Generated by Django 3.2.22 on 2024-03-27 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='mobile',
            field=models.CharField(max_length=11, verbose_name='手机号'),
        ),
    ]
