import { useDispatch, useSelector } from "react-redux"
import { useState } from 'react'
import { useHistory, Link } from "react-router-dom"
import { useEffect } from "react"
import { getFavorites,  deleteFavorite } from "../../store/favorites"
import noimage from '../../no_image/No_Image_Available.jpg'
import './Favorites.css'

function Favorites(){
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const favorites = useSelector(state => state.favorites)
  const favoritesArr = Object.values(favorites)



  const favorite_delete = async (productId) => {

    let deletedFavorite = await dispatch(deleteFavorite(user.id, productId))
    await dispatch(getFavorites(user.id))
  }

  useEffect(() => {
    if (user)dispatch(getFavorites(user.id))
  }, [dispatch])

  return (
    <div>
      { favoritesArr.length > 0 ? <div className="favorites_list">
      {favoritesArr.map((favorite) => {
        return (
          <li key={favorite.products.id}>
            <div className="favorite_item">
            <Link to={`/products/${favorite.products.id}`}>
              {favorite.products.images.length == 0 ? <img className='img' src={noimage}></img>:
               <img className='img' src={favorite.products.images[0].url}
              onError={(e)=>{ if (e.target.src !== noimage)
              { e.target.onerror = null; e.target.src=noimage; } }} alt='displayimg'></img>}
             <div>
              </div>
              </Link>
              <div className="favorite_details">
                <p id="favorite_name">{favorite.products.productName}</p>
                <span className='price'>${favorite.products.price}</span>
                <div className='remove_button_div'>
                <button id="remove_fav_button" onClick={e => favorite_delete(favorite.products.id)}>Remove From Favorites</button>
                </div>
              </div>
            </div>
          </li>
        )
      })}
      </div>
      : <div className='no_favorites'><h1 className='count_total'>You haven't favorited anything
      yet.</h1></div> }
    </div>
  )
}

export default Favorites
