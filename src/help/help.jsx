import React from 'react';

export function Help() {
  return (
    <main className="main-content">
      <section className="card">
        <h3 className="h5 text-warning mb-3">Mechanics & Rules</h3>
        <ul className="help-list text-light small ps-3">
          <li className="mb-2"><strong>HP & Attack:</strong> Pieces do not immediately capture; they reduce HP based on their attack stat.</li>
          <li className="mb-2"><strong>Echo:</strong> A piece that echoes can go through pieces regardless of what piece it is, and what it goes through. An echoed piece will also always return to its original position at the end of the turn.</li>
          <li><strong>Ignite:</strong> A piece that ignites will not only damage where it lands, but all surrounding pieces in a 3x3 area at reduced damage, friend or foe. Use with caution.</li>
        </ul>
      </section>
    </main>
  );
}