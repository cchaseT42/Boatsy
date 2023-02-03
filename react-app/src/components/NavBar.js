
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../components/auth/auth.css'
import LoginFormModal from './LoginFormModal';
import SignUpFormModal from './SignupFormModal';
import SellFormModal from './SellFormModal';
import logo from '../logo/Screenshot_49.png'
import carts from '../store/cart';
import { getCart } from '../store/cart';
import github  from '../assets/github-mark.png'
import linkedin from '../assets/linkin.png'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  // const cartObj = useSelector(state => state.carts)
  // const cart = Object.values(cartObj)
  // console.log(cart.length)
  // useEffect(() => {
  //   dispatch(getCart(user.id))
  // }, [dispatch])

  return (
    <nav id="navbar">
      <div id='navbar_div'>
          <div className='navbar_div'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img className='logo' src={logo}/>
          </NavLink>
          </div>
          <div className='socials'>
            <a href="https://github.com/cchaseT42">
            <div className="github">
            <img id="socialimg" src={github}></img>
            </div>
            </a>
            <a href='https://www.linkedin.com/in/chase-towe-89673523a/'>
            <div className='linkedin'>
            <img id="socialimg2" src={linkedin}></img>
            </div>
            </a>
          </div>
          <div className='user_buttons'>
          <NavLink to='/cart' exact={true} activeClassName='active'>
          <div>
          <span className='cart_div'>{user && <span className="material-symbols-outlined" id='carticon'>shopping_cart_checkout</span>}</span>
          </div>
          </NavLink>
            {user && <SellFormModal/>}
            {!user && <SignUpFormModal/>}
          <li>
            {!user && <LoginFormModal/>}
            {user && <LogoutButton/>}
          </li>
          </div>
      </div>
    </nav>
  );
}

export default NavBar;
