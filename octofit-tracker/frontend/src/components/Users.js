import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    team_id: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const baseUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;
      
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
      
      // Handle both paginated (.results) and plain array responses
      const usersArray = usersData.results || usersData;
      const teamsArray = teamsData.results || teamsData;
      
      setUsers(usersArray);
      setTeams(teamsArray);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      role: user.role || '',
      team_id: user.team_id || ''
    });
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: '',
      team_id: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/${editingUser._id || editingUser.id}/`;
      
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: editingUser._id || editingUser.id,
          name: formData.name,
          email: formData.email,
          role: formData.role,
          team_id: formData.team_id ? parseInt(formData.team_id) : null
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();
      console.log('User updated:', updatedUser);

      // Update the users list
      setUsers(users.map(user => 
        (user._id || user.id) === (editingUser._id || editingUser.id) ? updatedUser : user
      ));

      handleCloseModal();
      alert('User updated successfully!');
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Error updating user: ' + err.message);
    }
  };

  const getTeamName = (teamId) => {
    if (!teamId) return 'No Team';
    const team = teams.find(t => (t._id || t.id) === teamId);
    return team ? team.name : 'N/A';
  };

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
        <h2 className="mb-0">Users</h2>
        <button className="btn btn-primary">+ Add User</button>
      </div>
      
      {users.length === 0 ? (
        <div className="empty-state">
          <p>No users found.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Team</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id}>
                  <td><strong>{user._id || user.id}</strong></td>
                  <td>{user.name || 'N/A'}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role ? (
                      <span className="badge bg-primary">{user.role}</span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td><span className="badge bg-info">{getTeamName(user.team_id)}</span></td>
                  <td>
                    <button 
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User Details</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                      <option value="coach">Coach</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="team_id" className="form-label">Team</label>
                    <select
                      className="form-select"
                      id="team_id"
                      name="team_id"
                      value={formData.team_id}
                      onChange={handleInputChange}
                    >
                      <option value="">No Team</option>
                      {teams.map((team) => (
                        <option key={team._id || team.id} value={team._id || team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
