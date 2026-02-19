import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to count members for a specific team
  const getMemberCount = (teamId) => {
    return users.filter(user => user.team_id === teamId).length;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;
        
        // Fetch teams
        const teamsResponse = await fetch(`${baseUrl}/teams/`);
        if (!teamsResponse.ok) {
          throw new Error(`HTTP error! status: ${teamsResponse.status}`);
        }
        const teamsData = await teamsResponse.json();
        console.log('Teams data received:', teamsData);
        
        // Fetch users to calculate member counts
        const usersResponse = await fetch(`${baseUrl}/users/`);
        if (!usersResponse.ok) {
          throw new Error(`HTTP error! status: ${usersResponse.status}`);
        }
        const usersData = await usersResponse.json();
        console.log('Users data received:', usersData);
        
        // Handle both paginated (.results) and plain array responses
        const teamsArray = teamsData.results || teamsData;
        const usersArray = usersData.results || usersData;
        
        setTeams(teamsArray);
        setUsers(usersArray);
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
        <h2 className="mb-0">Teams</h2>
        <button className="btn btn-primary">+ Create Team</button>
      </div>
      
      {teams.length === 0 ? (
        <div className="empty-state">
          <p>No teams found.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Team ID</th>
                <th>Team Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.id}>
                  <td><strong>{team._id || team.id}</strong></td>
                  <td><strong>{team.name}</strong></td>
                  <td>{team.description || 'N/A'}</td>
                  <td><span className="badge bg-info">{getMemberCount(team._id || team.id)} members</span></td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">View</button>
                    <button className="btn btn-sm btn-success">Join</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Teams;
