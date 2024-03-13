import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import Tradutor from '../components/Tradutor';
import texts from '../components/Texts';
import { useLanguageContext } from '../hooks/LanguageContext';

const isActive = (path) => {
  if (window.location.pathname === path) {
    return { color: '#ff9900' }
  } else {
    return { color: '#ffffff' }
  }
};

const Menu = () => {
  const { isEnglishLanguage } = useLanguageContext();
  const menuMessages = texts[isEnglishLanguage ? 'en' : 'ptbr'].navigation;

  const navigate = useNavigate();

  return (
    <div>
      <ul className='nav nav-tabs bg-primary'>
        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive('/')}
            to='/'
          >
            Home
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive('/user/dashboard')}
            to='/user/dashboard'
          >
            Dashboard
          </Link>
        </li>

        {!isAuthenticated() && (
          <>
            <li className='nav-item' style={isActive('/')}>
              <Link
                className='nav-link'
                style={isActive('/signin')}
                to='/signin'
              >
                {menuMessages.signin}
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link'
                style={isActive('/signup')}
                to='/signup'
              >
                {menuMessages.signup}
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <li className='nav-item'>
            <span
              className='nav-link'
              style={{ cursor: 'pointer', color: '#ffffff' }}
              onClick={() => signout(() => {
                navigate('/');
              })}
            >
              Signout
            </span>
          </li>
        )}

        <li className='nav-item'>
          <Tradutor />
        </li>
      </ul>
    </div>
  );
};

export default Menu;
