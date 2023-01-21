from rest_framework.serializers import ModelSerializer
from .models import Note
# This will be serializer for a specific model
class NoteSerializer(ModelSerializer):
    class Meta:
        model=Note
        fields='__all__' #Here we specify fields we wanna serialize,
        # If we want to specify then fields=['body','updated']

