from cmath import nan
from .models import TodoList, Todo
from .serializers import TodoListSerializer, TodoSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def todoView(request):
  todos = Todo.objects.all()
  serializer = TodoSerializer(todos, many=True)
  print(serializer)
  return Response(serializer.data)

@api_view(["PUT", "DELETE"])
def todoDetailView(request, pk):
  instance = Todo.objects.get(id=pk)
  data = request.data
  if request.method == "DELETE":
    instance.delete()
    return Response({"message": "Todo was successfully deleted"})
  elif request.method == "PUT":
    serializer = TodoSerializer(instance=instance, data=data)
    if serializer.is_valid():
      serializer.save()
    else:
      return Response({"message": "Failed to Updated"})
    return Response(serializer.data)

@api_view(["GET", "POST"])
def todoListView(request):
  serializer = nan

  if request.method == "POST":
    serializer = TodoListSerializer(data=request.data, many=False)
    if serializer.is_valid():
      serializer.save()

  elif request.method == "GET":
    todoList = TodoList.objects.all()
    serializer = TodoListSerializer(todoList, many=True)

  return Response(serializer.data)

@api_view(["GET", "PUT", "DELETE"])
def todoListDetailView(request, pk):
  print(request.method)
  serializer = nan
  if request.method == "PUT":
    data = request.data
    instance = TodoList.objects.get(id=pk)
    serializer = TodoListSerializer(instance=instance, data=data)

    if serializer.is_valid():
      serializer.save()

  elif request.method == "DELETE":
    instance = TodoList.objects.get(id=pk)
    instance.delete()
    return Response({"message": "Todo item was successfully deleted"})
  
  elif request.method == "GET":
    todoList = TodoList.objects.filter(todo_id=pk)
    serializer = TodoListSerializer(todoList, many=True)


  return Response(serializer.data)
