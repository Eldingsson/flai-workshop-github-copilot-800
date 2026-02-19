import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/octofitapp-small.png" alt="OctoFit Logo" className="navbar-logo" />
            <span className="ms-2">OctoFit Tracker</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">Workouts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <div className="container mt-4">
            <div className="hero-section">
              <h1 className="display-4">Welcome to OctoFit Tracker</h1>
              <p className="lead">Track your fitness activities, compete with teams, and achieve your fitness goals!</p>
              <div className="row mt-5">
                <div className="col-md-3 mb-3">
                  <Link to="/users" className="card-link">
                    <div className="card text-center clickable-card">
                      <div className="card-body">
                        <h3 className="card-title">👥</h3>
                        <h5>Users</h5>
                        <p className="card-text">View and manage all users in the OctoFit community.</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3 mb-3">
                  <Link to="/activities" className="card-link">
                    <div className="card text-center clickable-card">
                      <div className="card-body">
                        <h3 className="card-title">📊</h3>
                        <h5>Activities</h5>
                        <p className="card-text">Log your workouts and monitor your progress over time.</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3 mb-3">
                  <Link to="/leaderboard" className="card-link">
                    <div className="card text-center clickable-card">
                      <div className="card-body">
                        <h3 className="card-title">🏆</h3>
                        <h5>Leaderboard</h5>
                        <p className="card-text">Join teams and climb the leaderboard rankings.</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3 mb-3">
                  <Link to="/workouts" className="card-link">
                    <div className="card text-center clickable-card">
                      <div className="card-body">
                        <h3 className="card-title">💪</h3>
                        <h5>Workouts</h5>
                        <p className="card-text">Get personalized workout suggestions tailored to you.</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        } />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
