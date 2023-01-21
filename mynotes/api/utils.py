from rest_framework.response import Response
from .serializers import NoteSerializer
from .models import Note


def getNotesList(request):
    # Now if we want our most edited note at top then use ordere_by(updated)
    notes=Note.objects.all().order_by('-updated')
    # now here we cant directly pass notes.we need serializers to convert this object to json format.
    serializer=NoteSerializer(notes,many=True); #many=true means we r serializing multiple objects and return a query set
    return Response(serializer.data) #We want to give data from serializer
    # Now we can see our notes with timestamp.



def getNoteDetail(request,primaryKey):
    notes=Note.objects.get(id=primaryKey)
    serializer=NoteSerializer(notes,many=False); #many=false means we r serializing one single object        
    return Response(serializer.data) #We want to give data from serializer
    

def createNote(request):
    data=request.data
    note=Note.objects.create(
        body=data['body'] #update and created are modified automatically
    )
        
    serializer=NoteSerializer(note,many=False); #many=false means we r serializing one single object
    return Response(serializer.data) #We want to give data from serializer


def updateNote(request,primaryKey):

    # # Put is for updating items
    data = request.data  # By this we can fetch data from request
    note = Note.objects.get(id=primaryKey)
    # here we getting instance of that note and passing new data to the serializer
    serializer = NoteSerializer(instance=note, data=data)

    # If its valid we throw value to our serializer and save
    if serializer.is_valid():
        serializer.save()
    # We want to give data from serializer
    return (serializer.data)


def deleteNode(request,primaryKey):
    note=Note.objects.get(id=primaryKey)
    note.delete()
    return Response("Note was deleted!!")