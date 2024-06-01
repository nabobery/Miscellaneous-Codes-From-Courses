from django.urls import path

from . import views

# The variable app_name is used to organize URLs by application.
app_name = 'polls'

# The variable urlpatterns is a list of URL patterns.
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.results, name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
