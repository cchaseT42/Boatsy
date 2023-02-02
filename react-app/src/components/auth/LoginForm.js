import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormModal';
import './auth.css'

const LoginForm = ({setShowModal}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const error = []

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) return setErrors(data);
    setShowModal(false)
    await history.push('/')
  };

  const demoUser = async (e) => {
    e.preventDefault();
    setShowModal(false)
    const data = await dispatch(login("demo@aa.io", "password"))
  }


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login_div">
      <div className='sign_in'>
      <p className='sign_in_p'>
        Sign in
      </p>
      </div>
    <form onSubmit={onLogin}>
      <div className="login_form">
      <div className="errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="email">
        <div>
        <label className='above_form' htmlFor='email'>Email address</label>
        </div>
        <input
          className='login_input'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className = "password">
        <div>
        <label className='above_form' htmlFor='password'>Password</label>
        </div>
        <input
          className='login_input'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
      <div className='signin_button'>
        <button id='login' type='submit'>Sign in</button>
      </div>
      <div className='signin_button'>
        <button id="demo" type='submit' onClick={demoUser}>Demo</button>
      </div>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
