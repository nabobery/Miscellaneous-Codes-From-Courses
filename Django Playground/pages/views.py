from django.shortcuts import render

# Create your views here.

# The index view
def index(request):
    return render(request, 'pages/index.html')
