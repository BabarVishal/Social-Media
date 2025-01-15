import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/dashboard" element={<AdminDashboard />} /> {/* Admin Dashboard path */}
    </Routes>
  </Router>
);

export default App;

