import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [usernameInput, setUsernameInput] = useState(
    localStorage.getItem('userName') || ''
  );
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      localStorage.setItem('userName', usernameInput.trim());
      navigate('/play');
    }
  };

  return (
    <main className="main-content">
      <div className="header-auth mb-3">
        <form onSubmit={handleLogin} className="d-flex gap-1 justify-content-center w-100" style={{ maxWidth: '320px' }}>
          <input 
            type="text" 
            className="form-control form-control-sm bg-dark text-white border-secondary" 
            placeholder="User" 
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <button type="submit" className="btn btn-warning btn-sm fw-bold">Login</button>
        </form>
        <p className="user-badge mt-1">
          Status: <span className="badge text-bg-warning">{usernameInput || 'Guest'}</span>
        </p>
      </div>
      <div className="card hero-card">
        <img src="echoignitionLogoPlaceholder.png" alt="Echo Ignition Logo - Flamethrower Horse" className="app-logo" />
        <h2 className="text-white h5">Triumph over your enemies</h2>
        <p className="text-white small mb-0">Welcome to echo ignition, the RPG chess game !</p>
      </div>
    </main>
  );
}