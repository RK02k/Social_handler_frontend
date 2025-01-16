import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserForm from './UserForm';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <div className="mt-4 text-center">
          <Link to="/">
            <button className="btn btn-secondary me-2">User Form</button>
          </Link>
          <Link to="/dashboard">
            <button className="btn btn-secondary">Admin Dashboard</button>
          </Link>
        </div>
      </div>
    </Router>
  );
};

export default App;
