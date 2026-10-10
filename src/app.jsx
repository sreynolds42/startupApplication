import React from 'react';
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Stats } from './stats/stats';
import { Help } from './help/help';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function NavContent() {
  const location = useLocation();
    // this is to keep the functionality of the button that swaps between home and play
  // ideally, once logged in, the home page would be useless and just redirect to play, so this is placeholder until login functionality is implemented
  const isPlay = location.pathname === '/play';

  return (
    <nav className="bottom-banner">
      <NavLink className="nav-btn btn-secondary" to="help">HELP</NavLink>
      {isPlay ? (
        <NavLink className="nav-btn btn-primary" to="">HOME</NavLink>
      ) : (
        <NavLink className="nav-btn btn-primary" to="play">PLAY</NavLink>
      )}
      <NavLink className="nav-btn btn-secondary" to="stats">STATS</NavLink>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header className="top-banner">
          <h1>ECHO IGNITION</h1>
        </header>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/play' element={<Play />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/help' element={<Help />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="site-footer">
          <p>Author: <strong>Sanford Reynolds</strong> | <a href="https://github.com/sreynolds42/startupApplication" target="_blank" rel="noreferrer">GitHub Repository</a></p>
        </footer>

        <NavContent />
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="main-content"><div className="card text-center">404: Return to sender. Address unknown.</div></main>;
}