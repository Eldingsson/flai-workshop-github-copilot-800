import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get user name by user_id
  const getUserName = (userId) => {
    const user = users.find(u => (u._id || u.id) === userId);
    return user ? user.name : 'Unknown User';
  };

  // Helper function to get team name by team_id
  const getTeamName = (teamId) => {
    if (!teamId) return 'No Team';
    const team = teams.find(t => (t._id || t.id) === teamId);
    return team ? team.name : 'N/A';
  };

  // Helper function to calculate total calories for a user
  const getTotalCalories = (userId) => {
    return activities
      .filter(activity => activity.user_id === userId)
      .reduce((total, activity) => total + (activity.calories || 0), 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;
        
        // Fetch leaderboard
        const leaderboardResponse = await fetch(`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`);
        if (!leaderboardResponse.ok) {
          throw new Error(`HTTP error! status: ${leaderboardResponse.status}`);
        }
        const leaderboardData = await leaderboardResponse.json();
        console.log('Leaderboard data received:', leaderboardData);
        
        // Fetch users
        const usersResponse = await fetch(`${baseUrl}/users/`);
        if (!usersResponse.ok) {
          throw new Error(`HTTP error! status: ${usersResponse.status}`);
        }
        const usersData = await usersResponse.json();
        console.log('Users data received:', usersData);
        
        // Fetch teams
        const teamsResponse = await fetch(`${baseUrl}/teams/`);
        if (!teamsResponse.ok) {
          throw new Error(`HTTP error! status: ${teamsResponse.status}`);
        }
        const teamsData = await teamsResponse.json();
        console.log('Teams data received:', teamsData);
        
        // Fetch activities
        const activitiesResponse = await fetch(`${baseUrl}/activities/`);
        if (!activitiesResponse.ok) {
          throw new Error(`HTTP error! status: ${activitiesResponse.status}`);
        }
        const activitiesData = await activitiesResponse.json();
        console.log('Activities data received:', activitiesData);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardArray = leaderboardData.results || leaderboardData;
        const usersArray = usersData.results || usersData;
        const teamsArray = teamsData.results || teamsData;
        const activitiesArray = activitiesData.results || activitiesData;
        
        setLeaderboard(leaderboardArray);
        setUsers(usersArray);
        setTeams(teamsArray);
        setActivities(activitiesArray);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger error-alert" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">🏆 Leaderboard</h2>
        <button className="btn btn-success">Refresh</button>
      </div>
      
      {leaderboard.length === 0 ? (
        <div className="empty-state">
          <p>No leaderboard data available.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Total Points</th>
                <th>Total Calories</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => {
                let rankBadge = '';
                if (index === 0) rankBadge = '🥇';
                else if (index === 1) rankBadge = '🥈';
                else if (index === 2) rankBadge = '🥉';
                
                return (
                  <tr key={entry._id || entry.id || index}>
                    <td><strong>{rankBadge} {entry.rank || (index + 1)}</strong></td>
                    <td>{getUserName(entry.user_id)}</td>
                    <td>{getTeamName(entry.team_id)}</td>
                    <td><span className="badge bg-primary">{entry.total_points || 0}</span></td>
                    <td><span className="badge bg-success">{getTotalCalories(entry.user_id)}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
