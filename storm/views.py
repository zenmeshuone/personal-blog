from django.views import generic
from django.shortcuts import render
from django.shortcuts import get_object_or_404, get_list_or_404

# Create your views here.
def INDEXviews(request):
    return render(request, 'index.html')
