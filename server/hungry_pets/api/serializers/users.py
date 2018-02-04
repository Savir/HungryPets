from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers

from hungry_pets.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    @staticmethod
    def _check_password(password, confirm_password):
        if not password:
            raise serializers.ValidationError("Password field can not be empty on User creation.")
        if not confirm_password:
            raise serializers.ValidationError("Password-confirmation field can not be empty on User creation.")
        if password != confirm_password:
            raise serializers.ValidationError("Password and confirmation don't match")

    def create(self, validated_data):
        password = validated_data['password']  # On creation we MUST have a password (and a confirm password)
        confirm_password = validated_data.pop('confirm_password')
        self._check_password(password, confirm_password)
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        # On update, we may or may not be updating the password. If we are, then we need to check
        if 'password' in validated_data or 'confirm_password' in validated_data:
            self._check_password(validated_data.get('password', None), validated_data.pop('confirm_password', None))
            instance.set_password(validated_data['password'])
            update_session_auth_hash(self.context.get('request'), instance)

        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.save()
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
