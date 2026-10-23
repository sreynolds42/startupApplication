import React, { useState, useEffect } from 'react';

export function Stats() {
  const [username, setUsername] = useState('Guest');

  useEffect(() => {
    const savedUser = localStorage.getItem('userName');
    if (savedUser) {
      setUsername(savedUser);
    }
  }, []);

  return (
    <main className="main-content">
      <div className="user-badge mb-2">Profile: <span id="username-val" className="highlight">{username}</span></div>

      <section className="card db-card text-white">
        <h3 className="text-warning h5">Lifetime Combat Record</h3>
        <div className="stats-grid">
          <div className="stat-box text-light">
            <span className="stat-label text-light">Wins / Losses: </span>
            <span className="stat-value highlight">42 / 18</span>
          </div>
          <div className="stat-box text-light">
            <span className="stat-label text-light">Win Rate: </span>
            <span className="stat-value highlight">70.0%</span>
          </div>
          <div className="stat-box text-light">
            <span className="stat-label text-light">Total Damage: </span>
            <span className="stat-value highlight">14,850</span>
          </div>
          <div className="stat-box text-light">
            <span className="stat-label text-light">Pieces Destroyed: </span>
            <span className="stat-value highlight">210</span>
          </div>
        </div>
      </section>

      <section className="card db-card text-white">
        <h3 className="text-warning h5">Piece Kills & Performance</h3>
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle mb-2 text-warning" style={{ fontSize: '0.6rem' }}>
            <thead>
              <tr>
                <th>Piece</th>
                <th>Kills</th>
                <th>Avg DMG</th>
                <th>Fav Ability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pawn</td>
                <td>84</td>
                <td>120</td>
                <td>Ignite</td>
              </tr>
              <tr>
                <td>Knight</td>
                <td>52</td>
                <td>340</td>
                <td>Echo</td>
              </tr>
              <tr>
                <td>Rook</td>
                <td>41</td>
                <td>510</td>
                <td>Ignite</td>
              </tr>
              <tr>
                <td>Queen</td>
                <td>33</td>
                <td>890</td>
                <td>Echo</td>
              </tr>
            </tbody>
          </table>
        </div>
        <span className="api-tag text-secondary">Database Data Placeholder</span>
      </section>
    </main>
  );
}