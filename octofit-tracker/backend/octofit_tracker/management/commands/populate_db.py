from django.core.management.base import BaseCommand
from pymongo import MongoClient


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Starting database population...')
        
        # Connect to MongoDB
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        
        # Clear existing data
        self.stdout.write('Clearing existing data...')
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})
        
        # Create unique index on email field for users collection
        self.stdout.write('Creating unique index on email field...')
        db.users.create_index([('email', 1)], unique=True)
        
        # Insert Teams
        self.stdout.write('Inserting teams...')
        teams = [
            {'_id': 1, 'name': 'Team Marvel', 'description': 'The mightiest heroes of Earth'},
            {'_id': 2, 'name': 'Team DC', 'description': 'The greatest superheroes of all time'}
        ]
        db.teams.insert_many(teams)
        
        # Insert Users
        self.stdout.write('Inserting users...')
        users = [
            # Team Marvel
            {'_id': 1, 'name': 'Tony Stark', 'email': 'ironman@marvel.com', 'team_id': 1, 'role': 'member'},
            {'_id': 2, 'name': 'Steve Rogers', 'email': 'captainamerica@marvel.com', 'team_id': 1, 'role': 'member'},
            {'_id': 3, 'name': 'Natasha Romanoff', 'email': 'blackwidow@marvel.com', 'team_id': 1, 'role': 'member'},
            {'_id': 4, 'name': 'Bruce Banner', 'email': 'hulk@marvel.com', 'team_id': 1, 'role': 'member'},
            {'_id': 5, 'name': 'Thor Odinson', 'email': 'thor@marvel.com', 'team_id': 1, 'role': 'member'},
            {'_id': 6, 'name': 'Peter Parker', 'email': 'spiderman@marvel.com', 'team_id': 1, 'role': 'member'},
            # Team DC
            {'_id': 7, 'name': 'Clark Kent', 'email': 'superman@dc.com', 'team_id': 2, 'role': 'member'},
            {'_id': 8, 'name': 'Bruce Wayne', 'email': 'batman@dc.com', 'team_id': 2, 'role': 'member'},
            {'_id': 9, 'name': 'Diana Prince', 'email': 'wonderwoman@dc.com', 'team_id': 2, 'role': 'member'},
            {'_id': 10, 'name': 'Barry Allen', 'email': 'flash@dc.com', 'team_id': 2, 'role': 'member'},
            {'_id': 11, 'name': 'Arthur Curry', 'email': 'aquaman@dc.com', 'team_id': 2, 'role': 'member'},
            {'_id': 12, 'name': 'Hal Jordan', 'email': 'greenlantern@dc.com', 'team_id': 2, 'role': 'member'},
        ]
        db.users.insert_many(users)
        
        # Insert Activities
        self.stdout.write('Inserting activities...')
        activities = [
            # Team Marvel activities
            {'_id': 1, 'user_id': 1, 'activity_type': 'Running', 'duration': 45, 'distance': 8.5, 'calories': 650, 'date': '2026-02-15'},
            {'_id': 2, 'user_id': 2, 'activity_type': 'Cycling', 'duration': 60, 'distance': 25.0, 'calories': 800, 'date': '2026-02-15'},
            {'_id': 3, 'user_id': 3, 'activity_type': 'Swimming', 'duration': 30, 'distance': 2.0, 'calories': 400, 'date': '2026-02-16'},
            {'_id': 4, 'user_id': 4, 'activity_type': 'Weight Training', 'duration': 90, 'distance': 0.0, 'calories': 600, 'date': '2026-02-16'},
            {'_id': 5, 'user_id': 5, 'activity_type': 'Running', 'duration': 50, 'distance': 10.0, 'calories': 750, 'date': '2026-02-17'},
            {'_id': 6, 'user_id': 6, 'activity_type': 'Cycling', 'duration': 40, 'distance': 15.0, 'calories': 500, 'date': '2026-02-17'},
            # Team DC activities
            {'_id': 7, 'user_id': 7, 'activity_type': 'Running', 'duration': 60, 'distance': 15.0, 'calories': 900, 'date': '2026-02-15'},
            {'_id': 8, 'user_id': 8, 'activity_type': 'Martial Arts', 'duration': 120, 'distance': 0.0, 'calories': 1000, 'date': '2026-02-15'},
            {'_id': 9, 'user_id': 9, 'activity_type': 'Weight Training', 'duration': 75, 'distance': 0.0, 'calories': 550, 'date': '2026-02-16'},
            {'_id': 10, 'user_id': 10, 'activity_type': 'Running', 'duration': 25, 'distance': 12.0, 'calories': 700, 'date': '2026-02-16'},
            {'_id': 11, 'user_id': 11, 'activity_type': 'Swimming', 'duration': 60, 'distance': 5.0, 'calories': 800, 'date': '2026-02-17'},
            {'_id': 12, 'user_id': 12, 'activity_type': 'Cycling', 'duration': 45, 'distance': 20.0, 'calories': 600, 'date': '2026-02-17'},
        ]
        db.activities.insert_many(activities)
        
        # Insert Leaderboard
        self.stdout.write('Inserting leaderboard...')
        leaderboard = [
            # Team Marvel
            {'_id': 1, 'user_id': 1, 'team_id': 1, 'total_points': 650, 'rank': 5},
            {'_id': 2, 'user_id': 2, 'team_id': 1, 'total_points': 800, 'rank': 3},
            {'_id': 3, 'user_id': 3, 'team_id': 1, 'total_points': 400, 'rank': 11},
            {'_id': 4, 'user_id': 4, 'team_id': 1, 'total_points': 600, 'rank': 6},
            {'_id': 5, 'user_id': 5, 'team_id': 1, 'total_points': 750, 'rank': 4},
            {'_id': 6, 'user_id': 6, 'team_id': 1, 'total_points': 500, 'rank': 9},
            # Team DC
            {'_id': 7, 'user_id': 7, 'team_id': 2, 'total_points': 900, 'rank': 2},
            {'_id': 8, 'user_id': 8, 'team_id': 2, 'total_points': 1000, 'rank': 1},
            {'_id': 9, 'user_id': 9, 'team_id': 2, 'total_points': 550, 'rank': 8},
            {'_id': 10, 'user_id': 10, 'team_id': 2, 'total_points': 700, 'rank': 10},
            {'_id': 11, 'user_id': 11, 'team_id': 2, 'total_points': 800, 'rank': 3},
            {'_id': 12, 'user_id': 12, 'team_id': 2, 'total_points': 600, 'rank': 7},
        ]
        db.leaderboard.insert_many(leaderboard)
        
        # Insert Workouts
        self.stdout.write('Inserting workouts...')
        workouts = [
            {'_id': 1, 'name': 'Super Strength Circuit', 'description': 'High-intensity strength training', 'difficulty': 'Hard', 'duration': 45},
            {'_id': 2, 'name': 'Speed Training', 'description': 'Improve your speed and agility', 'difficulty': 'Medium', 'duration': 30},
            {'_id': 3, 'name': 'Endurance Run', 'description': 'Long-distance running workout', 'difficulty': 'Medium', 'duration': 60},
            {'_id': 4, 'name': 'Combat Training', 'description': 'Martial arts and combat skills', 'difficulty': 'Hard', 'duration': 90},
            {'_id': 5, 'name': 'Recovery Yoga', 'description': 'Stretching and flexibility exercises', 'difficulty': 'Easy', 'duration': 30},
            {'_id': 6, 'name': 'HIIT Blaster', 'description': 'High-intensity interval training', 'difficulty': 'Hard', 'duration': 20},
        ]
        db.workouts.insert_many(workouts)
        
        self.stdout.write(self.style.SUCCESS('Database population completed successfully!'))
        self.stdout.write(f'Inserted {len(teams)} teams')
        self.stdout.write(f'Inserted {len(users)} users')
        self.stdout.write(f'Inserted {len(activities)} activities')
        self.stdout.write(f'Inserted {len(leaderboard)} leaderboard entries')
        self.stdout.write(f'Inserted {len(workouts)} workouts')
