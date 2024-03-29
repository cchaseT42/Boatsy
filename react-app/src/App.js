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
import Orders from './components/Orders/Orders'
import SingleOrder from './components/SingleOrder/SingleOrder';
import Favorites from './components/Favorites/Favorites';
import UpdateOrder from './components/UpdateOrder/UpdateOrder';
import Cart from './components/Cart/cart';
import { authenticate } from './store/session';
import Footer from './components/Footer';
import ReactGA from 'react-ga';
import './index.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const TRACKING_ID = "G-XEXB615L5Y "; // YOUR_OWN_TRACKING_ID
  ReactGA.initialize(TRACKING_ID);

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
      <div className="main">
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
        <Route path='/orders/update/:orderId' exact={true}>
          <UpdateOrder/>
        </Route>
        <Route path='/orders/:orderId' exact={true}>
          <SingleOrder/>
        </Route>
        <Route path='/orders'>
          <Orders/>
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
      </div>
      <div id="footer"></div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
