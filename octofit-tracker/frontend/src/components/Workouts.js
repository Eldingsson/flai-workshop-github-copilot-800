import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(workoutsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
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
        <h2 className="mb-0">💪 Personalized Workouts</h2>
        <button className="btn btn-primary">+ Create Workout</button>
      </div>
      
      {workouts.length === 0 ? (
        <div className="empty-state">
          <p>No workouts available.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Workout Name</th>
                <th>Description</th>
                <th>Duration (min)</th>
                <th>Difficulty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => {
                let difficultyClass = 'bg-secondary';
                if (workout.difficulty === 'Easy') difficultyClass = 'bg-success';
                else if (workout.difficulty === 'Medium') difficultyClass = 'bg-warning';
                else if (workout.difficulty === 'Hard') difficultyClass = 'bg-danger';
                
                return (
                  <tr key={workout._id || workout.id}>
                    <td><strong>{workout._id || workout.id}</strong></td>
                    <td><strong>{workout.name}</strong></td>
                    <td>{workout.description}</td>
                    <td><span className="badge bg-info">{workout.duration} min</span></td>
                    <td><span className={`badge ${difficultyClass}`}>{workout.difficulty}</span></td>
                    <td>
                      <button className="btn btn-sm btn-success me-2">Start</button>
                      <button className="btn btn-sm btn-primary">View</button>
                    </td>
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

export default Workouts;
