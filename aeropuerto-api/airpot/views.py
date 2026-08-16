from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Gate, Flight
from .serializers import GateSerializer, FlightSerializer
from .permissions import IsAdminOrReadOnly

class GateViewSet(viewsets.ModelViewSet):
    queryset = Gate.objects.all().order_by("id")
    serializer_class = GateSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["code", "terminal","is_available"]
    ordering_fields = ["id", "code", "terminal", "is_available", "created_at"]

class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.select_related("gate").all().order_by("-id")
    serializer_class = FlightSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["code"]
    search_fields = ["gate_id", "flight_number", "destination", "status"]
    ordering_fields = ["id","gate_id", "flight_number", "destination", "status",  "departure_time", "created_at" ]

    def get_queryset(self):
        qs = super().get_queryset()
        anio_min = self.request.query_params.get("anio_min")
        anio_max = self.request.query_params.get("anio_max")
        if anio_min:
            qs = qs.filter(anio__gte=int(anio_min))
        if anio_max:
            qs = qs.filter(anio__lte=int(anio_max))
        return qs

    def get_permissions(self):
        # Público: SOLO listar vehículos
        if self.action == "list":
            return [AllowAny()]
        return super().get_permissions()