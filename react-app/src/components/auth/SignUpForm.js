import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './auth.css'

const SignUpForm = ({setShowModal}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const error = []

  const onSignUp = async (e) => {
    e.preventDefault();

    if (!username) error.push('Username field required')
    if (!email) error.push('Email field is required.')
    if (!password) error.push('Password field is required')
    if (!repeatPassword) error.push('Repeat password field is required.')
    if ((password && repeatPassword) && password !== repeatPassword){
      error.push("Passwords don't match.")
    }

    if (error.length) return setErrors(error)

      const data = await dispatch(signUp(username, email, password));
      if (data) return setErrors(data)
      setShowModal(false)
      await history.push('/')
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup_div'>
    <form onSubmit={onSignUp}>
      <div className="signup_form">
      <div className="errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="username">
        <label className='above_form'>User Name</label>
        <input
          className='signup_input'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="email_signup">
        <label className='above_form'>Email</label>
        <input
          className='signup_input'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="password">
        <label className='above_form' >Password</label>
        <input
          className='signup_input'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="password">
        <label className='above_form'>Repeat Password</label>
        <input
          className='signup_input'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
        <div className='signin_button'>
         <button id='login' type='submit'>Sign Up</button>
         </div>
      </div>
      </div>
    </form>
    </div>
  );
};

export default SignUpForm;
