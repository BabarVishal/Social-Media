import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const { data } = await axios.get('http://localhost:5000/submissions');
      setSubmissions(data);
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="admin-dashboard">
  <h1>Admin Dashboard</h1>
  {submissions.map((user, index) => (
    <div key={index} className="user-card">
      <h2>{user.name}</h2>
      <p>{user.socialHandle}</p>
      <div className="images-container">
        {user.images.map((image, idx) => (
          <img
            key={idx}
            src={`http://localhost:5000/${image}`}
            alt={`user-${index}-${idx}`}
          />
        ))}
      </div>
    </div>
  ))}
</div>

  );
};

export default AdminDashboard;
