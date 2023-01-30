
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../components/auth/auth.css'
import LoginFormModal from './LoginFormModal';

const NavBar = () => {
  return (
    <nav id="navbar">
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
          {/* <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink> */}
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
          <NavLink to='/cart' exact={true} activeClassName='active'>
            Cart
          </NavLink>
          <NavLink to ='/products/sell' exact={true} activeClassName='active'>
            Sell
          </NavLink>
          <li>
          <LoginFormModal />
          </li>
          <LogoutButton />
    </nav>
  );
}

export default NavBar;
