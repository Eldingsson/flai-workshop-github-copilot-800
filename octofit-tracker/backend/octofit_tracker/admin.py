from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """Admin interface for User model"""
    list_display = ('_id', 'name', 'email', 'team_id', 'role')
    list_filter = ('role', 'team_id')
    search_fields = ('name', 'email')
    ordering = ('_id',)


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    """Admin interface for Team model"""
    list_display = ('_id', 'name', 'description')
    search_fields = ('name', 'description')
    ordering = ('_id',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    """Admin interface for Activity model"""
    list_display = ('_id', 'user_id', 'activity_type', 'duration', 'distance', 'calories', 'date')
    list_filter = ('activity_type', 'date')
    search_fields = ('activity_type',)
    ordering = ('-date', '_id')
    date_hierarchy = 'date'


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    """Admin interface for Leaderboard model"""
    list_display = ('_id', 'user_id', 'team_id', 'total_points', 'rank')
    list_filter = ('team_id',)
    search_fields = ('user_id',)
    ordering = ('rank',)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    """Admin interface for Workout model"""
    list_display = ('_id', 'name', 'difficulty', 'duration', 'description')
    list_filter = ('difficulty',)
    search_fields = ('name', 'description')
    ordering = ('_id',)
