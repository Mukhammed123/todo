from django.shortcuts import render
from django.http import JsonResponse
from .models import TodoList, Todo
from .serializers import TodoListSerializer, TodoSerializer

def todoView(request):
  todos = Todo.objects.all()
  serializer = TodoSerializer(todos, many=True)
  print(serializer)
  return JsonResponse(serializer.data, safe=False)

def todoListView(request):
  todoList = TodoList.objects.all()
  serializer = TodoListSerializer(todoList, many=True)
  return JsonResponse(serializer.data, safe=False)

def todoListDetailView(request, pk):
  todoList = TodoList.objects.filter(todo_id=pk)
  serializer = TodoListSerializer(todoList, many=True)
  return JsonResponse(serializer.data, safe=False)