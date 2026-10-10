import React from 'react';

export function Play() {
  return (
    <main className="main-content play-layout">
      <button className="btn btn-sm btn-outline-warning text-white position-absolute end-0 top-50 translate-middle-y me-2">Daily Puzzle</button>
      <div className="game-status">Turn: <span className="highlight">Guest</span></div>

      {/* Board Placeholder */}
      <section className="board-container">
        <div className="chess-board">
          {/* row 1 */}
          <div className="square dark">♜</div>
          <div className="square light">♞</div>
          <div className="square dark">♝</div>
          <div className="square light">♚</div>
          <div className="square dark">♛</div>
          <div className="square light">♝</div>
          <div className="square dark">♞</div>
          <div className="square light">♜</div>
          {/* row 2 */}
          <div className="square light">♟</div>
          <div className="square dark">♟</div>
          <div className="square light">♟</div>
          <div className="square dark">♟</div>
          <div className="square light">♟</div>
          <div className="square dark">♟</div>
          <div className="square light">♟</div>
          <div className="square dark">♟</div>
          {/* row 3 */}
          <div className="square dark"></div>
          <div className="square light"></div>
          <div className="square dark"></div>
          <div className="square light"></div>
          <div className="square dark"></div>
          <div className="square light"></div>
          <div className="square dark"></div>
          <div className="square light"></div>
          {/* row 4 */}
          <div className="square light"></div>
          <div className="square dark"></div>
          <div className="square light"></div>
          <div className="square dark"></div>
          <div className="square light"></div>
          <div className="square dark"></div>
          <div className="square light"></div>
          <div className="square dark"></div>
          {/* row 5 */}
          <div className="square dark"></div>
          <div className="square light"></div>
          <div className="square dark"></div>
          <div className="square light"></div>
          <div className="square dark"></div>
          <div className="square light"></div>
          <div className="square dark"></div>
          <div className="square light"></div>
          {/* row 6 */}
          <div className="square light"></div>
          <div className="square dark"></div>
          <div className="square light"></div>
          <div className="square dark"></div>
          <div className="square light"></div>
          <div className="square dark"></div>
          <div className="square light"></div>
          <div className="square dark"></div>
          {/* row 7 */}
          <div className="square dark">♙</div>
          <div className="square light">♙</div>
          <div className="square dark">♙</div>
          <div className="square light">♙</div>
          <div className="square dark">♙</div>
          <div className="square light">♙</div>
          <div className="square dark">♙</div>
          <div className="square light">♙</div>
          {/* row 8 */}
          <div className="square light">♜</div>
          <div className="square dark">♞</div>
          <div className="square light">♝</div>
          <div className="square dark">♚</div>
          <div className="square light">♛</div>
          <div className="square dark">♝</div>
          <div className="square light">♞</div>
          <div className="square dark">♜</div>
        </div>
      </section>

      {/* Ability Buttons */}
      <div className="btn-group my-3 w-100" role="group" style={{ maxWidth: '380px' }}>
        <button type="button" className="btn btn-lg text-white fw-bold btn-echo">Echo</button>
        <button type="button" className="btn btn-lg text-white fw-bold btn-ignite">Ignite</button>
      </div>

      {/* Feed + Player to player chat */}
      <section className="card websocket-card">
        <div className="feed-box">
          <p className="ws-msg mb-0">Websocket Chat</p>
        </div>
      </section>
    </main>
  );
}