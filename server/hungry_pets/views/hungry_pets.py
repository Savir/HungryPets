from django.shortcuts import render


def hungry_pets(request):
    return render(request, 'hungry_pets.html')
