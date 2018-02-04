from django.shortcuts import render


def hungry_pets_spa(request):
    return render(request, 'hungry_pets_spa.html')
