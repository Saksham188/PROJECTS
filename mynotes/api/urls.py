from django.urls import path
from . import views

urlpatterns=[
    path('',views.getRoutes,name="routes"), #we added name to allow access it dynamically
    path('notes/',views.getNotes,name="notes"),
    # path('notes/create/',views.createNote,name="create-note"),
    # we dont need them as we made api restful
    # path('notes/<str:primaryKey>/update/',views.UpdateNote,name="update-note"), #now if we pass /notes/id eg notes/2 then we get 2nd note.
    # path('notes/<str:primaryKey>/delete/',views.DeleteNote,name="delete-note"), #now if we pass /notes/id eg notes/2 then we get 2nd note.
    
    path('notes/<str:primaryKey>/',views.getNote,name="note"), #now if we pass /notes/id eg notes/2 then we get 2nd note.
]
