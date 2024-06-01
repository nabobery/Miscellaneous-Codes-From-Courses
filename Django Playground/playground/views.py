from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
# request handler : Used to handle the request from the client by returning a response
def say_hello(request):
    #return HttpResponse("Hello, Django!")
    return render(request, 'hello.html', {'name' : 'Django'})