from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import User, Team, Activity, Leaderboard, Workout


class UserModelTest(TestCase):
    """Test case for User model"""
    
    def setUp(self):
        self.user = User.objects.create(
            _id=100,
            name='Test User',
            email='test@example.com',
            team_id=1,
            role='member'
        )
    
    def test_user_creation(self):
        """Test that user is created successfully"""
        self.assertEqual(self.user.name, 'Test User')
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(str(self.user), 'Test User')


class TeamModelTest(TestCase):
    """Test case for Team model"""
    
    def setUp(self):
        self.team = Team.objects.create(
            _id=100,
            name='Test Team',
            description='A test team'
        )
    
    def test_team_creation(self):
        """Test that team is created successfully"""
        self.assertEqual(self.team.name, 'Test Team')
        self.assertEqual(str(self.team), 'Test Team')


class ActivityModelTest(TestCase):
    """Test case for Activity model"""
    
    def setUp(self):
        self.activity = Activity.objects.create(
            _id=100,
            user_id=1,
            activity_type='Running',
            duration=30,
            distance=5.0,
            calories=300,
            date='2026-02-19'
        )
    
    def test_activity_creation(self):
        """Test that activity is created successfully"""
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 30)


class UserAPITest(APITestCase):
    """Test case for User API endpoints"""
    
    def setUp(self):
        self.user = User.objects.create(
            _id=101,
            name='API Test User',
            email='apitest@example.com',
            team_id=1,
            role='member'
        )
    
    def test_get_users_list(self):
        """Test retrieving users list"""
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_user_detail(self):
        """Test retrieving a single user"""
        url = reverse('user-detail', args=[self.user._id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'API Test User')


class TeamAPITest(APITestCase):
    """Test case for Team API endpoints"""
    
    def setUp(self):
        self.team = Team.objects.create(
            _id=101,
            name='API Test Team',
            description='Team for API testing'
        )
    
    def test_get_teams_list(self):
        """Test retrieving teams list"""
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_team_detail(self):
        """Test retrieving a single team"""
        url = reverse('team-detail', args=[self.team._id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'API Test Team')


class ActivityAPITest(APITestCase):
    """Test case for Activity API endpoints"""
    
    def setUp(self):
        self.activity = Activity.objects.create(
            _id=101,
            user_id=1,
            activity_type='Cycling',
            duration=45,
            distance=15.0,
            calories=400,
            date='2026-02-19'
        )
    
    def test_get_activities_list(self):
        """Test retrieving activities list"""
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LeaderboardAPITest(APITestCase):
    """Test case for Leaderboard API endpoints"""
    
    def setUp(self):
        self.leaderboard_entry = Leaderboard.objects.create(
            _id=101,
            user_id=1,
            team_id=1,
            total_points=500,
            rank=1
        )
    
    def test_get_leaderboard_list(self):
        """Test retrieving leaderboard list"""
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class WorkoutAPITest(APITestCase):
    """Test case for Workout API endpoints"""
    
    def setUp(self):
        self.workout = Workout.objects.create(
            _id=101,
            name='Test Workout',
            description='A test workout routine',
            difficulty='Medium',
            duration=30
        )
    
    def test_get_workouts_list(self):
        """Test retrieving workouts list"""
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_workout_detail(self):
        """Test retrieving a single workout"""
        url = reverse('workout-detail', args=[self.workout._id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Workout')


class APIRootTest(APITestCase):
    """Test case for API root endpoint"""
    
    def test_api_root(self):
        """Test that API root returns all available endpoints"""
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
