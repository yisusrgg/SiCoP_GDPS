from django.db import models
from apps.project.models import project
# Create your models here.

class goalstatic(models.Model):
    internCode = models.ForeignKey(project, on_delete=models.CASCADE)
    ObjetiveRepit = models.IntegerField(default=1)


    def __str__(self):
        return self.name
