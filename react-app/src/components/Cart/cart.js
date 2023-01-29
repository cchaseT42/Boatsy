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

  const cartsObj = useSelector(state => state.carts)
  const carts = Object.values(cartsObj)
  let itemsArr = []
  let productsArr = []
  carts.forEach(product => {
    if (!itemsArr.includes(product.productId)){
      console.log("not included", product.productId)
      console.log(itemsArr, "itemsArr")
      product.count = 1
      itemsArr.push(product.productId)
      productsArr.push(product)
    } else {
      productsArr.forEach(products => {
        if (products.productId === product.productId)
        products.count += 1
      })
      console.log(productsArr, "products")
    }
  })

  // Object.values(carts.map((products) => {
  //   let itemsArr = []
  //   if (itemsArr.includes(products)){
  //     products.count += 1
  //     return
  //   } else {
  //     itemsArr.push(products)
  //     products.count = 1
  //   }
  // }))


  return (
    <div>
      {Object.values(carts).map((products) => {
        {let itemsArr = []
          if (itemsArr.includes(products)){
            return console.log("included!")
          } else {
            itemsArr.push(products)
          }
         }
        return(
          <ul>
            <li>
              <span>
                <img className="img" src={products.products.images[0].url}></img>
              </span>
              <span>
              {products.products.productName}
              </span>
            </li>
          </ul>
        )
        })
      }
    </div>
    )
}

export default Cart
