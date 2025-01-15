import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import "./UserForm.css";

const UserForm = () => {
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialHandle', socialHandle);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      await axios.post('https://social-media-d1af.vercel.app/submit', formData);
      alert('Submission successful!');
      navigate('/dashboard');  // Navigate to the Admin Dashboard
    } catch (error) {
      alert('Error submitting data');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Social Handle"
        value={socialHandle}
        onChange={(e) => setSocialHandle(e.target.value)}
        required
      />
      <input
        type="file"
        multiple
        onChange={(e) => setImages(e.target.files)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;

