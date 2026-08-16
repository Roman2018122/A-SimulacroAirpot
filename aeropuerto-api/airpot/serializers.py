from rest_framework import serializers
from .models import Gate, Flight

class GateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gate
        fields = ["id", "code", "terminal", "is_available", "created_at"]

class FlightSerializer(serializers.ModelSerializer):
    marca_nombre = serializers.CharField(source="marca.nombre", read_only=True)

    class Meta:
        model = Flight
        fields = ["id", "gate_id", "flight_number", "destination", "departure_time", "creado_en"]