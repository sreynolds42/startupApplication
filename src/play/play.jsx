import React, { useState } from 'react';

export function Play() {
  // state manager for the daily puzzle API
  const [puzzleData, setPuzzleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetching the puzzle from the api via lichess
  const fetchDailyPuzzle = async () => {
    setLoading(true);
    setError(null);
    try{
      // try getting the api
      const response = await fetch('https://lichess.org/api/puzzle/daily');
      // if it fails
      if (!response.ok){
        throw new Error('Failed to get daily puzzle');
      }
      // using await to not clog up time waiting
      const data = await response.json();
      setPuzzleData(data);
    } catch (err){
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-content play-layout">
      {/* still have to implement button affecting game, will do that once game is implemented*/}
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