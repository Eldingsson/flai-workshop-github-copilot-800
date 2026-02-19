from djongo import models


class User(models.Model):
    _id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team_id = models.IntegerField(null=True, blank=True)
    role = models.CharField(max_length=50, default='member')

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.name


class Team(models.Model):
    _id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name


class Activity(models.Model):
    _id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField()
    activity_type = models.CharField(max_length=100)
    duration = models.IntegerField()  # in minutes
    distance = models.FloatField()    # in km or miles
    calories = models.IntegerField()
    date = models.DateField()

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.activity_type} - {self.date}"


class Leaderboard(models.Model):
    _id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField()
    team_id = models.IntegerField()
    total_points = models.IntegerField()
    rank = models.IntegerField()

    class Meta:
        db_table = 'leaderboard'

    def __str__(self):
        return f"User {self.user_id} - Rank {self.rank}"


class Workout(models.Model):
    _id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=50)
    duration = models.IntegerField()  # in minutes

    class Meta:
        db_table = 'workouts'

    def __str__(self):
        return self.name
