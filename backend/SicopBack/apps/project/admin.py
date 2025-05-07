from django.contrib import admin
from .models import project

@admin.register(project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        'internCode', 
        'projectName', 
        'dateBegin', 
        'dateEnd', 
        'financing', 
        'amount', 
        'projectLeader', 
        'linked'
    )
    search_fields = ('internCode', 'projectName', 'projectLeader__name')
    list_filter = ('invArea', 'financing', 'linked', 'dateBegin', 'dateEnd')