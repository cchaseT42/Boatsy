import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../store/product'
import { addFavorite, deleteFavorite, getFavorites } from '../../store/favorites'
import { getOrders, getOrder } from '../../store/orders'

import LoginFormModal from '../LoginFormModal'
import './AllProducts.css'
import noimage from '../../no_image/No_Image_Available.jpg'

function AllProducts(){
  const dispatch = useDispatch()

  const products = useSelector(state => state.products)
  const user = useSelector(state => state.session.user)
  console.log(user)
  const favorites = useSelector(state => state.favorites)
  const favArr = []


 Object.values(favorites).forEach(ele =>{
    favArr.push(ele.productId)
  })

  const productsArr6 = Object.values(products).slice(0, 6)
  const productsArr7on = Object.values(products).slice(6)

  useEffect(() => {
    dispatch(getProducts())
    if (user) dispatch(getFavorites(user.id))
  }, [dispatch])

  const favorite_add = async (id) => {



    const payload = {
      productId: id,
      userId: user.id
    }

    let newFavorite = await dispatch(addFavorite(payload))
    await dispatch(getFavorites(user.id))
  }

  const favorite_delete = async (productId) => {

    let deletedFavorite = await dispatch(deleteFavorite(user.id, productId))
    await dispatch(getFavorites(user.id))
  }

  return (
    <div className='container'>
      <div className='splash'>
        <div className='boatsy_bubble_div'>
        <div className='boatsyDiv'>
        {!user && <h1 className='boatsy'> Welcome to boatsy</h1>}
        {user && <h1 className='boatsy'> Welcome back {user.username}</h1>}
        </div>
        <div className='bubbleitems'>
          {productsArr6.map((product) => {
            return (
              <li key={product.id}>
                 {(user && !favArr.includes(product.id)) && <div className='favorite_bubble'>
                  <span id="not_favorite" class="material-symbols-outlined" onClick={
                     e => favorite_add(product.id)
                  }>favorite</span>
                </div>
                }
                 {(user && favArr.includes(product.id)) &&<div className='favorite_bubble'>
                  <span id="is_favorite" class="material-symbols-outlined" onClick={
                    e => favorite_delete(product.id)
                  }>favorite</span>
                </div>}
                 <Link to={`/products/${product.id}`}>
                <span>
                {product.images.length == 0 ? <img className='bubbleimg' src={noimage}></img>:<img className='bubbleimg' src={product.images[0].url} alt=''></img>}
                </span>
                <div className='splash_text'>
                  <p>
                    {product.productName}
                  </p>
                </div>
                </Link>
              </li>
            )
          })}
        </div>
      </div>
    </div>
      <div className='flex'>
        {productsArr7on.map((product) => {
          return (
            <li key={product.id} className='product'>
              <div className="DivCont">
              <span>
              <Link to={`/products/${product.id}`}>
              {product.images.length == 0 ? <img className='img' src={noimage}></img>: <img className='img' src={product.images[0].url}
              onError={(e)=>{ if (e.target.src !== noimage)
              { e.target.onerror = null; e.target.src=noimage; } }} alt='displayimg'></img>}
             <div>
             <span id="displayCont">
                <span className='curr'>$</span>
                <span className='price'>{product.price}</span>
              </span>
              </div>
              </Link>
              {(user && !favArr.includes(product.id)) && <div className='favorite'>
                  <span id="not_favorite" class="material-symbols-outlined" onClick={
                     e => favorite_add(product.id)
                  }>favorite</span>
                </div>
                }
                {(user && favArr.includes(product.id)) && <div className='favorite'>
                  <span id="is_favorite" class="material-symbols-outlined" onClick={
                    e => favorite_delete(product.id)
                  }>favorite</span>
                </div>
                }
              </span>
              </div>
            </li>
          )
        })}
        </div>
    </div>
  )
}

export default AllProducts
