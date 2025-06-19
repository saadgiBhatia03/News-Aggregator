import React, { useState } from 'react';
import axios from 'axios';

function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/register', {
        username,
        password,
      });

      if (response.data.status === 'success') {
        setMessage('Registration successful! You can now log in.');
        setUsername('');
        setPassword('');
        onRegisterSuccess(); // This can redirect to login or homepage
      } else {
        setMessage(response.data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Error occurred during registration'
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
}

export default Register;
