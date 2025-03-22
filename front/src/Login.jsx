import React from 'react';
import './Login.scss'; 
import taskLogo from './assets/task.svg';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const handleGuestLogin = () => {
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
          />
        </div>

        <div className="input-group">
          <label className="input-label">Password</label>
          <input
            type="password"
            className="input-field"
            placeholder="Enter your password"
          />
        </div>

     
        <button className="login-button">
          Log In
        </button>

  
        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">or</span>
          <div className="divider-line"></div>
        </div>

       
        <button className="guest-button" onClick={handleGuestLogin}>
          Continue as Guest
        </button>

        
        <div className="signup-link">
          <span className="signup-text">Don't have an account? </span>
          <a href="/signup" className="signup-button">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;