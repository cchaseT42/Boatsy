import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { getCart } from "../../store/cart";

function Cart(){
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getCart(user.id))
  }, [dispatch])

  const carts = useSelector(state => state.carts)
  console.log(carts)

  return (
    <div>
      hi
    </div>
    )
}

export default Cart
