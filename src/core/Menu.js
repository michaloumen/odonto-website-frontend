import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signout } from '../auth';

const isActive = (path) => {
  if (window.location.pathname === path) {
    return { color: '#ff9900' }
  } else {
    return { color: '#ffffff' }
  }
};

const Menu = () => {
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

        <li className='nav-item' style={isActive('/')}>
          <Link
            className='nav-link'
            style={isActive('/signin')}
            to='/signin'
          >
            Signin
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive('/signup')}
            to='/signup'
          >
            Signup
          </Link>
        </li>

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
      </ul>
    </div>
  );
};

export default Menu;
