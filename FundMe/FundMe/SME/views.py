from django.shortcuts import render

# Create your views here.
def register(request):
	html = "<html><body>Hello, World!</body></html>"
    return HttpResponse(html)