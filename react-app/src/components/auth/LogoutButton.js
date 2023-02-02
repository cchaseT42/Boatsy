import React from 'react';
import { useDispatch } from 'react-redux';
import {useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await history.push('/')

  };

  return <button id='logout_btn' onClick={onLogout}>Sign Out</button>;
};

export default LogoutButton;
