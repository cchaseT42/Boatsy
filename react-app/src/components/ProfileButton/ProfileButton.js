// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"
import LogoutButton from '../auth/LogoutButton';
import SellFormModal from "../SellFormModal";
import '../auth/auth.css'

function ProfileButton({setShowModal}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const openFavorites = async (e) => {
    e.preventDefault()

    await history.push(`/favorites`)
  }

  const openOrders = async (e) => {
    e.preventDefault()

    await history.push('/orders')
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  return (
    <>
      <span id = "button" class="material-symbols-outlined" onClick={openMenu}>account_circle</span>
      {showMenu && (
      (<ul className="profile-dropdown">
        <div id="loggedInInfo">
          <li className="credentials"><SellFormModal/></li>
          <li className="credentials"><button id="nav_button_orders" onClick={openOrders}>Orders</button></li>
          <li className="credentials"><button id="nav_button" onClick={openFavorites}>Favorites</button></li>
          <li className="credentials"><LogoutButton/></li>
        </div>
        </ul>)
      )}
    </>
  );
}

export default ProfileButton;
