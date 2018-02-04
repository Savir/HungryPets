from django.contrib.auth import authenticate, login
from rest_framework import permissions, viewsets, generics
from rest_framework import status
from rest_framework.response import Response

from hungry_pets.api.serializers.users import UserSerializer
from hungry_pets.models import User


# noinspection PyRedundantParentheses
class UserHandler(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()

    def get_object(self):
        return self.request.user

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(),)


class LoginHandler(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        account = authenticate(email=request.data['email'], password=request.data['password'])

        if not account:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if account.is_active is not True:
            return Response({
                'status': 'Unauthorized',
                'message': 'This account has been disabled.'
            }, status=status.HTTP_401_UNAUTHORIZED)

        # We're good
        login(request, account)
        serializer_cls = self.get_serializer_class()
        serialized = serializer_cls(account)
        return Response(serialized.data)
