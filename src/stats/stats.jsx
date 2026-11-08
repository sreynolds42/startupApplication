import React, { useState, useEffect } from 'react';

export function Stats() {
  const [username, setUsername] = useState('Guest');
  const [userStats, setUserStats] = useState({
    wins: 0,
    losses: 0,
    totalDamage: 0,
    piecesDestroyed: 0,
    pieceKills: { Pawn: 0, Knight: 0, Bishop: 0, Rook: 0, Queen: 0 }
  });

  // this gets the user
  useEffect(() => {
    const savedUser = localStorage.getItem('userName') || 'Guest';
    setUsername(savedUser);
// if they arent a guest it pulls their stored stats
    if (savedUser !== 'Guest') {
      fetch('/api/stats')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setUserStats(data);
        })
        .catch(() => {});
    }
  }, []);
 // maths out total games played
  const totalGames = userStats.wins + userStats.losses;
  // does win rate
  const winRate = totalGames > 0 ? ((userStats.wins / totalGames) * 100).toFixed(1) : '0.0';

  return (
    <main className="main-content">
      <div className="user-badge mb-2">Profile: <span id="username-val" className="highlight">{username}</span></div>

      {/* Account stats */}
      <section className="card db-card text-white">
        <h3 className="text-warning h5">Lifetime Combat Record</h3>
        <div className="stats-grid">
          <div className="stat-box text-light">
            <span className="stat-label text-light">Wins / Losses: </span>
            <span className="stat-value highlight">{userStats.wins} / {userStats.losses}</span>
          </div>
          <div className="stat-box text-light">
            <span className="stat-label text-light">Win Rate: </span>
            <span className="stat-value highlight">{winRate}%</span>
          </div>
          <div className="stat-box text-light">
            <span className="stat-label text-light">Total Damage: </span>
            <span className="stat-value highlight">{userStats.totalDamage.toLocaleString()}</span>
          </div>
          <div className="stat-box text-light">
            <span className="stat-label text-light">Pieces Destroyed: </span>
            <span className="stat-value highlight">{userStats.piecesDestroyed}</span>
          </div>
        </div>
      </section>

      {/* Piece stats */}
      <section className="card db-card text-white">
        <h3 className="text-warning h5">Piece Kills & Performance</h3>
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle mb-2 text-warning" style={{ fontSize: '0.6rem' }}>
            <thead>
              <tr>
                <th>Piece</th>
                <th>Kills</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(userStats.pieceKills || {}).map(([piece, kills]) => (
                <tr key={piece}>
                  <td>{piece}</td>
                  <td>{kills}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <span className="api-tag text-secondary">Backend Service Data</span>
      </section>
    </main>
  );
}