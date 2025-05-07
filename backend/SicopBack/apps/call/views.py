from rest_framework import viewsets
from .api.serializers import CallSerializers
from .models import call
# Create your views here.
class CallView(viewsets.ModelViewSet):
    serializer_class = CallSerializers
    queryset = call.objects.all()