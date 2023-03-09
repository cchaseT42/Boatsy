
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../components/auth/auth.css'
import LoginFormModal from './LoginFormModal';
import SignUpFormModal from './SignupFormModal';
import SellFormModal from './SellFormModal';
import logo from '../logo/Screenshot_49.png'
import github  from '../assets/github-mark.png'
import linkedin from '../assets/linkin.png'
import ProfileButton from './ProfileButton/ProfileButton';

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false)

  return (
    <nav id="navbar">
      <div id='navbar_div'>
          <div className='navbar_div'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img className='logo' src={logo}/>
          </NavLink>
          </div>
          <div className='user_buttons'>
          <div>
          <NavLink to='/cart' exact={true} activeClassName='active'>
          <span className='cart_div'>{user && <span className="material-symbols-outlined" id='carticon'>shopping_cart_checkout</span>}</span>
          </NavLink>
          </div>
            {!user && <SignUpFormModal/>}
          <li>
            {!user && <LoginFormModal/>}
          </li>
          <li>
            {user && <ProfileButton/>}
          </li>
          </div>
      </div>
    </nav>
  );
}

export default NavBar;
