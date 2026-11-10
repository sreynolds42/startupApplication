import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// awesome and cool quotes
const retroQuotes = [
  "Voted worst game of 2004!",
  'Chess is for nerds, amirite????',
  "So freakin' retro",
  "Welcome to my video              game",
  "What do you think of my drawing i spent a lot of time on it",
  "I think it has a trojan",
  "So tuff",
  "in loving memory"
];

export function Login() {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem('userName') || ''
  );
  const [error, setError] = useState(null);
  const [randomQuote, setRandomQuote] = useState('');
  const navigate = useNavigate();

  // picks a random quote to display
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * retroQuotes.length);
    setRandomQuote(retroQuotes[randomIndex]);
  }, []);

  const loginUser = () => authenticate('/api/auth/login');
  const createUser = () => authenticate('/api/auth/create');

  const authenticate = async (endpoint) => {
    try {
      const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ email: usernameInput, password }),
        headers: { 'Content-type': 'application/json' },
      });
      if (response.status === 200) {
        localStorage.setItem('userName', usernameInput);
        setLoggedInUser(usernameInput);
        navigate('/play');
      } else {
        const body = await response.json();
        setError(body.msg);
      }
    } catch (err) {
      setError('Connection failed.');
    }
  };

  const logoutUser = async () => {
    await fetch('/api/auth/logout', { method: 'delete' }).catch(() => {});
    localStorage.removeItem('userName');
    setLoggedInUser('');
    setPassword('');
    setUsernameInput('');
  };

  return (
    <main className="main-content">
      <div className="header-auth mb-3">
        {loggedInUser ? (
          <div className="d-flex flex-column gap-2 align-items-center w-100" style={{ maxWidth: '320px' }}>
            <p className="text-white small mb-0">Welcome back, <span className="highlight">{loggedInUser}</span>!</p>
            <div className="d-flex gap-1 w-100">
              <button type="button" onClick={() => navigate('/play')} className="btn btn-warning btn-sm fw-bold flex-grow-1">Play</button>
              <button type="button" onClick={logoutUser} className="btn btn-secondary btn-sm fw-bold flex-grow-1">Logout</button>
            </div>
          </div>
        ) : (
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
              <button type="button" onClick={loginUser} className="btn btn-warning btn-sm fw-bold flex-grow-1">Login</button>
              <button type="button" onClick={createUser} className="btn btn-secondary btn-sm fw-bold flex-grow-1">Create</button>
            </div>
          </div>
        )}

        {error && <div className="text-danger small mt-1">{error}</div>}
        <p className="user-badge mt-1">
          Status: <span className="badge text-bg-warning">{loggedInUser || 'Guest'}</span>
        </p>
      </div>
      <div className="card hero-card">
        <img src="echoignitionLogoPlaceholder.png" alt="Echo Ignition Logo - Flamethrower Horse" className="app-logo" />
        <h2 className="text-black h5">Triumph over your enemies</h2>
        <p className="text-black small mb-2">Welcome to echo ignition, the RPG chess game !</p>
        
        {/* Rotating retro blurb */}
        <div style={{ border: '1px dashed #00ff00', background: '#000000', padding: '8px', marginTop: '10px' }}>
          <p className="small mb-0" style={{ color: '#00ff00', fontSize: '0.6rem', whiteSpace: 'pre' }}>
           {randomQuote}
          </p>
        </div>
      </div>
    </main>
  );
}