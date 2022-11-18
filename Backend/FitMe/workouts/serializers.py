from rest_framework import serializers

from .models import Workout, WorkoutExercise


class WorkoutDoneSerializer(serializers.Serializer):
    workout_id = serializers.IntegerField()
    workout_done = serializers.BooleanField()


class WorkoutExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutExercise
        fields = [
            "name",
            "num_of_sets",
            "num_of_reps",
            "description",
        ]


class CreateWorkoutSerializer(serializers.ModelSerializer):
    exercises = WorkoutExerciseSerializer(required=False, many=True)

    class Meta:
        model = Workout
        fields = [
            "client",
            "time",
            "duration",
            "type",
            "description",
            "done",
            "client_came",
            "exercises",
        ]

    def create(self, validated_data):
        if "exercises" in validated_data:
            exercises_data = validated_data.pop("exercises")
            workout = Workout.objects.create(**validated_data)
            for exercise_data in exercises_data:
                exercise = WorkoutExercise.objects.create(
                    workout=workout, **exercise_data
                )
                exercise.save()
        else:
            workout = Workout.objects.create(**validated_data)

        workout.save()
        return workout


class GetWorkoutsSerializer(serializers.ModelSerializer):
    client_full_name = serializers.CharField(source="client.full_name")
    exercises = WorkoutExerciseSerializer(many=True)

    class Meta:
        model = Workout
        fields = [
            "pk",
            "client",
            "client_full_name",
            "time",
            "duration",
            "type",
            "description",
            "done",
            "client_came",
            "exercises",
        ]
