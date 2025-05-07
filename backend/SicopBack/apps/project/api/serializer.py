from rest_framework import serializers
from apps.project.models import project

class ProjectSerializers(serializers.ModelSerializer):
    # Campos personalizados para datos relacionados
    company_name = serializers.CharField(source="rfcCom.companyName", read_only=True)  # Cambiado a companyName
    rfc_call = serializers.CharField(source="rfcCall.rfcCall", read_only=True)
    leader_name = serializers.CharField(source="projectLeader.name", read_only=True)

    class Meta:
        model = project
        fields = [
            "id",
            "internCode",
            "projectName",
            "objetives",
            "summary",
            "invArea",
            "dateBegin",
            "dateEnd",
            "financing",
            "amount",
            "rfcCall",
            "rfcCom",
            "lgac_Linea",
            "projectLeader",
            "linked",
            "projectcol",
            # Campos personalizados
            "company_name",
            "rfc_call",
            "leader_name",
        ]