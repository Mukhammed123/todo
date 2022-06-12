from django.urls import path
from .views import todoView, todoListView, todoListDetailView

urlpatterns = [
  path('', todoView),
  path('list/', todoListView),
  path('list/<str:pk>/', todoListDetailView)
]