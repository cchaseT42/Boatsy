import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getProduct, deleteProduct } from "../../store/product"
import { getCart, updateCart, createCart } from "../../store/cart"
import { getAllReviews, destroyReview } from "../../store/review"
import { getFavorites, addFavorite, deleteFavorite } from "../../store/favorites"
import CreateReviewModal from "../CreateReviewModal"
import UpdateReviewModal from "../UpdateReviewModal"
import noimage from '../../no_image/No_Image_Available.jpg'
import './SingleProduct.css'


function SingleProduct(){

  const dispatch = useDispatch()
  const history = useHistory()
  const { productId } = useParams()
  const favorites = useSelector(state => state.favorites)
  const favArr = []
  const products = useSelector(state => state.products)
  const productsArr = Object.values(products)
  const cart = useSelector(state => state.carts)
  const product = productsArr[0]
  const user = useSelector(state => state.session.user)
  let count = 0
  let avg
  let userHasReview = false
  let productHasReviews = false

  Object.values(favorites).forEach(ele =>{
    favArr.push(ele.productId)
  })

  if (product.reviews.length){
    productHasReviews = true
  }

  if (user){
  for(let i = 0; i < product.reviews.length; i++){
    if (product.reviews[i].user.id === user.id) userHasReview = true
  }
  }

  for(let i = 0; i < product.reviewAvg.length; i++){
    count += product.reviewAvg[i]
  }
  avg = count/product.reviewAvg.length

  console.log(avg)
  console.log(product)

  const addtoCart = async (e) => {
    e.preventDefault()

    let added = document.getElementById('added_to_cart')
    added.style.display="flex"



    let cartScan = Object.values(cart)
    let cartArr = []
    cartScan.forEach(product => {
      if (product.productId == productId){
        cartArr.push(product)
        return
      }
    })

    if (cartArr.length > 0) return addmoreCart(cartArr)

    const payload = {
      userId: user.id,
      productId: Number(productId),
      count: 1
    }


    let newCart = await dispatch(createCart(payload))
    await dispatch(getCart(user.id))
  }

  const handleDelete = async () => {
    await dispatch(deleteProduct(productId)).then(() => history.push('/'))
  }

  const addmoreCart = async (cart) => {

    const payload = {
      userId: user.id,
      productId: Number(productId),
      count: 1
    }

    let newCart = await dispatch(updateCart(cart[0].id, payload))

    await dispatch(getCart(user.id))
  }

  const leaveReview = async (e) => {
    e.preventDefault()
    await history.push(`/products/leavereview/${productId}`)
  }

  const deleteReview = async (id) => {
    let deletedReview = await dispatch(destroyReview(id))
    await dispatch(getProduct(productId))
  }

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


  useEffect(() => {
    dispatch(getProduct(productId))
    dispatch(getAllReviews(productId))
    if (user)dispatch(getFavorites(user.id))
  }, [dispatch])




  return (
    <div>
    <div className="ProductDetails">
              <div className="imgDiv">
              <span className='displayImg'>
              {product.images.length == 0 ? <img className='showImg' src={noimage}></img>: <img className='showImg' src={product.images[0].url}
              onError={(e)=>{ if (e.target.src !== noimage)
              { e.target.onerror = null; e.target.src=noimage; } }} alt='displayimg'></img>}
              </span>
              <div>
          <div className='lower_div'>
          {user && !userHasReview && <div>
            <CreateReviewModal/>
          </div>}
          <div className="reviews_div">
            <p className="review_counter">{product.reviewAvg.length} Reviews <span id="ratingStars" class="fa fa-star checked">{avg || 0}</span></p>
          </div>
          {product.reviews.map((review) => {
            return (
              <div className="reviewContainer">

              <div className="star_count">
              {[...Array(review.stars)].map((star) => {
                return (
                  <span id="ratingStars" class="fa fa-star checked">
                  </span>
                )
              })}
            </div>
              <span className="reviewText">{review.review}</span>
              <span className="reviewUser">By {review.user.username}</span>
              <span>
                {user !== null && user.id === review.userId && (
                  <div className="editReview">
                    <UpdateReviewModal reviewto={{review}}/>
                    <button id="deleteReviewButton"onClick={e => deleteReview(review.id)}>Delete</button>
                  </div>
                )}
              </span>
              </div>
            )
          })}
          </div>
        </div>
              </div>
              <div className='detailDiv'>
                <p id='ownerId'></p>
                {(user && !favArr.includes(product.id)) && <div className='favorite_single'onClick={
                  e => favorite_add(product.id)
                }>
                  <span id="not_favorite_single" class="material-symbols-outlined">favorite</span>
                </div>
                }
              {(user && favArr.includes(product.id)) &&<div className='favorite_single'onClick={
                  e => favorite_delete(product.id)
                }>
                 <span id="is_favorite_single" class="material-symbols-outlined">favorite</span>
                </div>}
                <div className='product_name'>
                  {productHasReviews && <p id="avg">{avg} <span id="ratingStars" class="fa fa-star checked"></span></p>}
                <h1 id='name'>{product.productName}</h1>
                <div className='product_price'>
                  <h2 id='product_price'>${product.price}</h2>
                </div>
                </div>
              {user !== null && user.id !== product.ownerId && (<div className="notOwnerButtons">
                <div id='added_to_cart'><p>Added!</p></div>
                <button className="cartbutton" onClick={addtoCart}>Add To Cart</button>
              </div>)}
              {!user && (<div className='not_logged_in'>
                <p id='info'>Sign up or Sign in to access Cart or Seller features!</p>
              </div>)}
              {user !== null && user.id === product.ownerId && (<div className='ownerbuttons'>
              <button className="buttonOwner" onClick={e => history.push(`/products/edit/${product.id}`)}>Edit</button>
              <button className="buttonOwner" onClick={handleDelete}>Delete</button>
              </div>)}
              <div id='lower'>
                <div id="filler-text">
                <span class="material-symbols-outlined" id='shipicon'>sailing</span>
                <p id='Hooray'>Hooray!</p>
                <p> This item ships free to any of the seven seas.</p>
                </div>
              <p id='description'>Description :</p>
              <p id='desc'>{product.productDescription}</p>
              </div>
              <div id="filler-text-2nd">
                <span class="material-symbols-outlined" id='handshakeicon'>handshake</span>
                <div>
                <p id='PiracyBody'><p id='Piracy'>Piracy Protection Policy:</p>Shop confidently with boatsy. should your loot be plundered
                during its journey to your port, I will personally send those responsible to Davy Jones's Locker
                </p>
                </div>
                </div>
              </div>
              </div>
              <div className="lower_div">
        </div>
    </div>
  )
}

export default SingleProduct
