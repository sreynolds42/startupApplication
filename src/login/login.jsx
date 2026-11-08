import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [usernameInput, setUsernameInput] = useState(
    localStorage.getItem('userName') || ''
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginUser = () => authenticate('/api/auth/login');
  const createUser = () => authenticate('/api/auth/create');

  const authenticate = async (endpoint) => {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: usernameInput, password }),
      headers: { 'Content-type': 'application/json' },
    });
    if (response.status === 200) {
      localStorage.setItem('userName', usernameInput);
      navigate('/play');
    } else {
      const body = await response.json();
      setError(body.msg);
    }
  };

  return (
    <main className="main-content">
      <div className="header-auth mb-3">
        <div className="d-flex flex-column gap-1 justify-content-center align-items-center w-100" style={{ maxWidth: '320px' }}>
          <input 
            type="text" 
            className="form-control form-control-sm bg-dark text-white border-secondary mb-1" 
            placeholder="User / Email" 
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <input 
            type="password" 
            className="form-control form-control-sm bg-dark text-white border-secondary mb-1" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex gap-1 w-100">
            <button onClick={loginUser} className="btn btn-warning btn-sm fw-bold flex-grow-1">Login</button>
            <button onClick={createUser} className="btn btn-secondary btn-sm fw-bold flex-grow-1">Create</button>
          </div>
        </div>
        {error && <div className="text-danger small mt-1">{error}</div>}
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