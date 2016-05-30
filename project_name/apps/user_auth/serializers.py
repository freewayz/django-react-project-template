from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from user_auth.models import Account


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    link = serializers.HyperlinkedIdentityField(view_name='account-detail')
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'link', 'email', 'created_at', 'updated_at',
                  'first_name', 'last_name', 'password',)
        read_only_fields = ('created_at', 'updated_at',)

        def create(self, validated_data):
            return Account.objects.create(**validated_data)
