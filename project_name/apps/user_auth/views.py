import json

from rest_framework import viewsets, permissions, status, views
from rest_framework.response import Response

from user_auth.models import Account
from user_auth.serializers import AccountSerializer
from user_auth.permissions import IsAccountOwner


class UserViewSet(viewsets.ModelViewSet):
    """User API Views"""
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        if pk == 'i':
            return Response(AccountSerializer(request.user).data)
        return super(UserViewSet, self).retrieve(request, pk)
