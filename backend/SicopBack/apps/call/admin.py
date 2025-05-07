from django.contrib import admin
from .models import call

@admin.register(call)
class CallAdmin(admin.ModelAdmin):
    list_display = ('rfcCall', 'callN', 'callBegin', 'callEnd')  # Campos que se mostrarán en la lista
    search_fields = ('rfcCall', 'callN')  # Campos por los que se puede buscar
    list_filter = ('callBegin', 'callEnd')  # Filtros en la barra lateral