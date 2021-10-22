from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.relations import ManyRelatedField
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from .serializers import TaskSerializer
from .models import Task


# Create your views here.
# overview of the different api views available
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/task-list',
        'Detail View': '/task-detail/<str:pk>',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>',
        'Delete': '/task-delete/<str:pk>',
    }

    return Response(api_urls)


# list of all the tasks
@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


# details of the specified task
@api_view(['GET'])
def taskDetail(request, pk):
    tasks = Task.objects.get(pk=pk)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)


# create a new task
@api_view(['POST'])
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


# update an existing task using POST
@api_view(['POST'])
def taskUpdate(request, pk):
    task = Task.objects.get(pk=pk)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


# delete an existing task
@api_view(['DELETE'])
def taskDelete(request, pk):
    task = Task.objects.get(pk=pk)
    task.delete()

    return Response('Item successfully deleted!')
