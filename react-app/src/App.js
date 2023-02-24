import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import AllProducts from './components/AllProducts/AllProducts';
import SingleProduct from './components/SingleProduct/SingleProduct';
import CreateProduct from './components/CreateProduct/CreateProduct';
import UpdateProduct from './components/UpdateProduct/UpdateProduct';
import CreateReview from './components/CreateReview/CreateReview';
import UpdateReview from './components/UpdateReview/UpdateReview';
import Favorites from './components/Favorites/Favorites';
import Cart from './components/Cart/cart';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <AllProducts/>
        </Route>
        <Route path='/cart'>
          <Cart/>
        </Route>
        <Route path='/favorites'>
          <Favorites/>
        </Route>
        <Route path='/products/sell'>
          <CreateProduct/>
        </Route>
        <Route path='/products/edit/:productId'>
          <UpdateProduct/>
        </Route>
        <Route path='/products/leavereview/:productId'>
          <CreateReview/>
        </Route>
        <Route path='/review/edit/:reviewId'>
          <UpdateReview/>
        </Route>
        <Route path='/products/:productId'>
          <SingleProduct/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
