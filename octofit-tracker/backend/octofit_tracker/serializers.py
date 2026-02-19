from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['_id', 'name', 'email', 'team_id', 'role']

    def to_representation(self, instance):
        """Convert ObjectId fields to strings"""
        representation = super().to_representation(instance)
        return representation


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['_id', 'name', 'description']

    def to_representation(self, instance):
        """Convert ObjectId fields to strings"""
        representation = super().to_representation(instance)
        return representation


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['_id', 'user_id', 'activity_type', 'duration', 'distance', 'calories', 'date']

    def to_representation(self, instance):
        """Convert ObjectId fields to strings"""
        representation = super().to_representation(instance)
        return representation


class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboard
        fields = ['_id', 'user_id', 'team_id', 'total_points', 'rank']

    def to_representation(self, instance):
        """Convert ObjectId fields to strings"""
        representation = super().to_representation(instance)
        return representation


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['_id', 'name', 'description', 'difficulty', 'duration']

    def to_representation(self, instance):
        """Convert ObjectId fields to strings"""
        representation = super().to_representation(instance)
        return representation
