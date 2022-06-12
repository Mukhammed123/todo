from django.urls import path
from .views import todoView, todoListView, todoListDetailView, todoDetailView

urlpatterns = [
  path('', todoView),
  path('<str:pk>/', todoDetailView),
  path('list/', todoListView),
  path('list/<str:pk>/', todoListDetailView)
]