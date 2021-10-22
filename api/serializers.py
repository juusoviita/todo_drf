from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        # will serialize all of the fields of the model, you can also list them e.g. ['id', 'title' ...]
        fields = '__all__'
