import React from 'react';

export function Login() {
  return (
    <main className="main-content">
      <div className="header-auth mb-3">
        <form action="play.html" method="get" className="d-flex gap-1 justify-content-center w-100" style={{ maxWidth: '320px' }}>
          <input type="text" className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="User" />
          <button type="submit" className="btn btn-warning btn-sm fw-bold">Login</button>
        </form>
        <p className="user-badge mt-1">Status: <span className="badge text-bg-warning">Guest</span></p>
      </div>
      <div className="card hero-card">
        <img src="echoignitionLogoPlaceholder.png" alt="Echo Ignition Logo - Flamethrower Horse" className="app-logo" />
        <h2 className="text-white h5">Triumph over your enemies</h2>
        <p className="text-white small mb-0">Welcome to echo ignition, the RPG chess game !</p>
      </div>
    </main>
  );
}