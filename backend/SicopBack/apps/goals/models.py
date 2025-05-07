from django.db import models

# Create your models here.

class Goals(models.Model):
   idGoal = models.IntegerField('ID_Metas', default=0)
   goalName = models.CharField(("Meta"), max_length=50)     
   
   def __str__(self):
      return self.goalName