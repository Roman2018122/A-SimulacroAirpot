from rest_framework import serializers

class AirlinesSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=120)
    code = serializers.CharField(max_length=20)
    country = serializers.CharField(max_length=120)
    is_active = serializers.BooleanField(default=True)
    created_at = serializers.DateTimeField(required =False)

class EventType:
        CREATED = "created"
        BOARDING_STARTED = "boarding started"
        DEPARTED = "departed"
        DELAYED = "delayed"
        CANCELLED = "cancelled"

        CHOICES = [
            (CREATED, "created"),
            (BOARDING_STARTED, "boaring started"),
            (DEPARTED, "departed"),
            (DELAYED, "delayed"),
            (CANCELLED, "cancelled"),
        ]

class Source:
        WEB = "web"
        MOBILE = "mobile"
        SYSTEM = "system"
        

        CHOICES = [
            (WEB, "Web"),
            (MOBILE, "Mobile"),
            (SYSTEM, "System"),
            
        ]

class FlightEventsSerializer(serializers.Serializer):
    flight_id = serializers.IntegerField()        # ID de Vehiculo (Postgres)
    event_type = serializers.ChoiceField(
            choices=EventType.CHOICES,
            default=EventType.CREATED )
    source = serializers.ChoiceField(
                choices=Source.CHOICES,
                default=Source.WEB )
    note = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField(required =   False)
