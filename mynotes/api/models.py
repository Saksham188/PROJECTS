from django.db import models

#here create ur database model
#every single class represents table and attribute represent columns,instances in each row represent rows

# In braket we wrote models.Model as its inheriting from MODELS class
class Note(models.Model):
    body=models.TextField(null=True,blank=True) #blank=True se we can submit empty form.
    updated=models.DateTimeField(auto_now=True) #Here autonow means every single time save is called ie we save a note it will take a time
    created=models.DateTimeField(auto_now_add=True) #auto_now_add only takes time stamp on creation of note and when next time we update it,it will not take a timestamp

    # We want that only first 50 characters of our note gets saved.
    def __str__(self):
        return self.body[0:50]



