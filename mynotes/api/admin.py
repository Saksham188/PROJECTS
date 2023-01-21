from django.contrib import admin

# Register your models here.

from .models import Note

# here we r registering our API
admin.site.register(Note)