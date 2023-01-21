from django.shortcuts import render
# from django.http import JsonResponse
from rest_framework.response import Response
# We want to view to render out json response
from rest_framework.decorators import api_view
from .utils import updateNote,getNoteDetail,deleteNode,getNotesList,createNote
from .models import Note
from .serializers import NoteSerializer

# It will have all the routes of our page
# here we add api methods we gonna use like GET,POST,Delete
@api_view(['GET']) #Isse if someone send POST req to our website it will not work.
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes) #Now we get more formatted json data.
    # return JsonResponse(routes,safe=False)
    # safe means we can return more data than just a python dictionary

# here we r adding decorator above this function
@api_view(['GET','POST'])
def getNotes(request):

    if(request.method =='GET'):
        return getNotesList(request)
        
    # We have made it restful so that get pr ye call ho aur post pr vo create kre
    if(request.method=='POST'):
        return createNote(request)


@api_view(['GET','PUT','DELETE'])
def getNote(request,primaryKey):
    if(request.method =='GET'):
      return getNoteDetail(request,primaryKey)
    # made restful here update called.
    if(request.method=='PUT'):
       return updateNote(request,primaryKey)
       
    if(request.method=='DELETE'):
       return deleteNode(request,primaryKey)



# @api_view(['POST'])
# def createNote(request):
#     data=request.data
#     note=Note.objects.create(
#         body=data['body'] #update and created are modified automatically
#     )
    
#     serializer=NoteSerializer(note,many=False); #many=false means we r serializing one single object
#     return Response(serializer.data) #We want to give data from serializer



# # Put is for updating items
# @api_view(['PUT'])
# def UpdateNote(request,primaryKey):
#     data=request.data; #By this we can fetch data from request
#     note=Note.objects.get(id=primaryKey)
#     # here we getting instance of that note and passing new data to the serializer
#     serializer=NoteSerializer(instance=note,data=data);

#     # If its valid we throw value to our serializer and save
#     if serializer.is_valid():
#         serializer.save();
#     return Response(serializer.data) #We want to give data from serializer

# Create your views here.

# Here we take method DELETE
# @api_view(['DELETE'])
# def DeleteNote(request,primaryKey):
#     note=Note.objects.get(id=primaryKey)
#     note.delete()
#     return Response("Note was deleted!!")
