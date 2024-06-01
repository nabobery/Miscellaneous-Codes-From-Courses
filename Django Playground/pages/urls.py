from django.urls import path

from . import views

# The variable urlpatterns is a list of URL patterns.
urlpatterns = [
    path('', views.index, name='index')
]
