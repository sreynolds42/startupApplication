import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div className="d-flex flex-column align-items-center gap-2">
      <div className="user-badge">
        Logged in as: <span className="highlight">{props.userName}</span>
      </div>
      <div className="d-flex gap-2">
        <Button variant='warning' size='sm' className='fw-bold' onClick={() => navigate('/play')}>
          Play Game
        </Button>
        <Button variant='outline-secondary' size='sm' className='text-light' onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
}