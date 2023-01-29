import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { createCart } from "../../store/cart";
import { deleteCart } from "../../store/cart";
import { getCart } from "../../store/cart";

function Cart(){
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const addtoCart = async (productId) => {

    const payload = {
      userId: user.id,
      productId: Number(productId),
    }

    console.log(payload)

    let newCart = await dispatch(createCart(payload))

    await dispatch(getCart(user.id))
  }

  const removefromCart = async (id) => {
    let deletedCart = await dispatch(deleteCart(id))

    await dispatch(getCart(user.id))
  }

  useEffect(() => {
    dispatch(getCart(user.id))
  }, [dispatch])

  const cartsObj = useSelector(state => state.carts)
  const carts = Object.values(cartsObj)
  const itemsArr = []
  const productsArr = []
  carts.forEach(product => {
    if (!itemsArr.includes(product.productId)){
      product.count = 1
      itemsArr.push(product.productId)
      productsArr.push(product)
    } else {
      productsArr.forEach(products => {
        if (products.productId === product.productId)
        products.count += 1
      })
    }
  })



  return (
    <div>
      {productsArr.map((product) => {
        return(
          <ul>
            <li>
              <img className='img'src={product.products.images[0].url}></img>
              <span>{product.products.productName}</span>
              <span> Amount: {product.count}</span>
              <span> Price: {product.count * product.products.price}</span>
              <button onClick={e => addtoCart(product.productId)}>Add</button>
              <button onClick={e => removefromCart(product.id)}>Remove</button>
            </li>
          </ul>
        )
      })}
    </div>
    )
  }

export default Cart
