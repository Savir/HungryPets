from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers

from hungry_pets.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    def create(self, validated_data):
        password = validated_data.get('password', None)
        confirm_password = validated_data.pop('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)

        instance.save()

        password = validated_data.get('password', None)
        confirm_password = validated_data.pop('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            instance.set_password(password)
            instance.save()

        update_session_auth_hash(self.context.get('request'), instance)

        return instance

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'password',
            'confirm_password'
        )
        read_only_fields = ('created_at', 'updated_at',)
