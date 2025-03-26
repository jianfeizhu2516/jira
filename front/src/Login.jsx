import React, { useState } from 'react';
import './Login.scss';
import taskLogo from './assets/task.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message);
        return;
      }

      const data = await res.json();
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/taskList');
    } catch (err) {
      console.error(err);
      setError('Login failed.');
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('user', JSON.stringify({ username: 'Guest' }));
    navigate('/taskList');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={taskLogo} alt="Task Manager Logo" className="logo" />
        <h1 className="login-title">Task Manager</h1>

        <div className="input-group">
          <label className="input-label">Email</label>
          <input
            type="email"
            className="input-field"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Password</label>
          <input
            type="password"
            className="input-field"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-button" onClick={handleLogin}>Log In</button>

        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">or</span>
          <div className="divider-line"></div>
        </div>

        <button className="guest-button" onClick={handleGuestLogin}>Continue as Guest</button>

        {error && <div className="error-message">{error}</div>}

        <div className="signup-link">
          <span className="signup-text">Don't have an account? </span>
          <a href="/signup" className="signup-button">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;