import React, { useState } from 'react';
import axios from 'axios';
import Register from './Register';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/login', {
        username,
        password,
      });

      if (res.data.status === 'success') {
        onLoginSuccess(); // Move to app
      } else {
        setMessage(res.data.message || 'Login failed');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login error');
    }
  };

  return (
    <div className="container mt-5">
      {!isRegistering ? (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-success" type="submit">Login</button>
            {message && <p className="mt-3">{message}</p>}
          </form>
          <p className="mt-3">
            Don't have an account?{' '}
            <button className="btn btn-link" onClick={() => setIsRegistering(true)}>Register</button>
          </p>
        </>
      ) : (
        <Register onRegisterSuccess={() => setIsRegistering(false)} />
      )}
    </div>
  );
}

export default Login;
