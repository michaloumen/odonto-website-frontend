import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const isActive = (path) => {
  if (window.location.pathname === path) {
    return { color: '#ff9900' }
  } else {
    return { color: '#ffffff' }
  }
};

const Menu = ({ history }) => {
  useNavigate();

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

        <li className='nav-item' style={isActive(history, '/')}>
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
      </ul>
    </div>
  );
};

export default Menu;
