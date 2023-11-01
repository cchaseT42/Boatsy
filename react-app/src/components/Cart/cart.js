import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from "react-router-dom";
import { updateCart, getCart, deleteCart } from "../../store/cart";
import { addOrderItem, createOrder } from "../../store/orders";
import noimage from '../../no_image/No_Image_Available.jpg'
import './cart.css'

function Cart(){
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const cartsObj = useSelector(state => state.carts)
  const carts = Object.values(cartsObj)
  const history = useHistory()
  let total = 0
  let count = 0

  const addtoCart = async (id, productId) => {

    const payload = {
      userId: user.id,
      productId: Number(productId),
      count: 1
    }


    let newCart = await dispatch(updateCart(id, payload))

    await dispatch(getCart(user.id))
  }

  const removefromCart = async (id, productId) => {
    const payload = {
      userId: user.id,
      productId: Number(productId),
      count: -1
    }


    let newCart = await dispatch(updateCart(id, payload))


    await dispatch(getCart(user.id))
  }

  const newOrder = async () => {

    const payload = {
      userId: user.id,
      total: count,
      subTotal: total
    }

    let createdOrder = await dispatch(createOrder(payload))



    carts.forEach(async (item) => {

      let cartPayload = {
        orderId: createdOrder.id,
        productId: item.productId,
        count: item.count
      }

      deletefromCart(item.id)
      let addedItem = await dispatch(addOrderItem(cartPayload))
    })

    await history.push(`orders/${createdOrder.id}`)
  }

  const deletefromCart = async (id) => {
    let deleted = await dispatch(deleteCart(id))
    await dispatch(getCart(user.id))
  }

  useEffect(() => {
    dispatch(getCart(user.id))
  }, [dispatch])



  return (
  <div className="ext_main">
    { carts.length > 0 ? <div className="flex-row"><div className='container_cart'>
      <div className="cart_items">
      {carts.map((product) => {
        return(
          <ul>
            <li className='list_element'>
            <div className='cart_details'>
              <div>
              <Link to={`/products/${product.products.id}`}>
              {product.products.images.length == 0 ? <img className='img' src={noimage}></img>: <img className='img' src={product.products.images[0].url}
              onError={(e)=>{ if (e.target.src !== noimage)
              { e.target.onerror = null; e.target.src=noimage; } }} alt='displayimg'></img>}
              </Link>
              </div>
              <div className='amount'>
              <p id="product_name">{product.products.productName}</p>
              <div className='amount_buttons'>
              <button className='cart_button' onClick={e => addtoCart(product.id, product.productId)}>Add</button>
              <span id='amount_p'> Amount {product.count}</span>
              <button className='cart_button' onClick={product.count > 1 ? e => (removefromCart(product.id, product.productId)) :
               e => deletefromCart(product.id) }>Remove</button>
              </div>
              </div>
              </div>
              <div className='price_details'>
                <p id='math'>{total += product.products.price * product.count} {count += product.count}</p>
              <span id='amount_p'>${Number(product.count * product.products.price).toFixed(2)}</span>
              <p id='amount_each_p'>(${Number(product.products.price).toFixed(2)} each)</p>
              </div>
            </li>
          </ul>
        )
      })}
      {/* <div>
        {count === 1 ? <h1 className='count_total'>{count} Item in Cart</h1> :
        <h1 className='count_total'>{count} Items in Cart</h1>}
      </div> */}
      </div>
      </div>
      <div className="checkout">
      <h3 id="count_checkout">{count} Items</h3>
      <h3 id="shipping">Total <h3 id="total">${Number(total).toFixed(2)}</h3></h3>
      <h3 id="shipping">Shipping <h3 id="free">FREE</h3></h3>
      <button id="place_order_button" onClick={e => newOrder()}>Place Order</button>
      </div>
    </div> : <div className='no_cart'><h1 className='count_total'>You haven't added anything to your cart yet
    . Have a look around!</h1></div> }
  </div>
    )
  }

export default Cart
