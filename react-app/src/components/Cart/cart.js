import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from "react-router-dom";
import { updateCart } from "../../store/cart";
import { deleteCart } from "../../store/cart";
import { getCart } from "../../store/cart";
import './cart.css'

function Cart(){
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  let total = 0

  const addtoCart = async (id, productId) => {

    const payload = {
      userId: user.id,
      productId: Number(productId),
      count: 1
    }

    console.log(payload)

    let newCart = await dispatch(updateCart(id, payload))

    await dispatch(getCart(user.id))
  }

  const removefromCart = async (id, productId) => {
    const payload = {
      userId: user.id,
      productId: Number(productId),
      count: -1
    }

    console.log(payload)

    let newCart = await dispatch(updateCart(id, payload))


    await dispatch(getCart(user.id))
  }

  const deletefromCart = async (id) => {
    let deleted = await dispatch(deleteCart(id))
    await dispatch(getCart(user.id))
  }

  useEffect(() => {
    dispatch(getCart(user.id))
  }, [dispatch])

  const cartsObj = useSelector(state => state.carts)
  console.log(cartsObj)
  const carts = Object.values(cartsObj)



  return (
    <div className='container_cart'>
      <div>
        {carts.length === 1 ? <h1 className='count_total'>{carts.length} Item in Cart</h1> : <h1 className='count_total'>{carts.length} Items in Cart</h1>}
      </div>
      <div className="cart_items">
      {carts.map((product) => {
        return(
          <ul>
            <li className='list_element'>
            <div className='cart_details'>
              <div>
              <Link to={`/products/${product.products.id}`}>
              {product.products.images.length === 0 ? <img className='img'></img>: <img className='img' src={product.products.images[0].url} alt=''></img>}
              </Link>
              </div>
              <div className='amount'>
              <p id="product_name">{product.products.productName}</p>
              <div className='amount_buttons'>
              <button className='cart_button' onClick={e => addtoCart(product.id, product.productId)}>Add</button>
              <span id='amount_p'> Amount {product.count}</span>
              <button className='cart_button' onClick={product.count !== 1 ? e => removefromCart(product.id, product.productId) :
               e => deletefromCart(product.id) }>Remove</button>
              </div>
              </div>
              </div>
              <div className='price_details'>
              <span id='amount_p'>${product.count * product.products.price}</span>
              <p id='amount_each_p'>(${product.products.price} each)</p>
              </div>
            </li>
          </ul>
        )
      })}
      <h1 className='count_total'>total ${total}</h1>
      </div>
    </div>
    )
  }

export default Cart
