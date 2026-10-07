import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { clearSession, getUserName } from '../utils/auth';

const Navbar: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const userName = getUserName();

  const linkClass = (path: string) =>
    `hover:text-red-400 transition ${location.pathname === path ? 'text-red-400 font-bold' : ''}`;

  const handleLogout = () => {
    clearSession();
    history.push('/login');
  };

  return (
    <nav className="w-full bg-red-900 text-white p-4 shadow-md flex justify-center items-center space-x-6">
      <Link to="/game" className={linkClass('/game')}>
        Jogo
      </Link>
      {userName ? (
        <>
          <span className="text-red-200">Olá, {userName}</span>
          <button type="button" onClick={handleLogout} className="hover:text-red-400 transition">
            Sair
          </button>
        </>
      ) : (
        <Link to="/login" className={linkClass('/login')}>
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
