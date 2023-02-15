import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getProduct } from "../../store/product"
import { deleteProduct } from "../../store/product"
import { createCart } from "../../store/cart"
import { getCart } from "../../store/cart"
import { updateCart } from "../../store/cart"
import noimage from '../../no_image/No_Image_Available.jpg'
import './SingleProduct.css'


function SingleProduct(){

  const dispatch = useDispatch()
  const history = useHistory()
  const { productId } = useParams()
  const products = useSelector(state => state.products)
  const productsArr = Object.values(products)
  const cart = useSelector(state => state.carts)
  const product = productsArr[0]
  const user = useSelector(state => state.session.user)
  let count = 0
  let avg

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
    console.log(added)



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


  useEffect(() => {
    dispatch(getProduct(productId))
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
          <div>
            <button id='leave_review_btn'>Leave Review</button>
          </div>
          <div className="reviews_div">
            <p>{product.reviewAvg.length} Reviews <span id="ratingStars" class="fa fa-star checked">{avg}</span></p>
          </div>
          {product.reviews.map((review) => {
            return (
              <div className="reviewContainer">
              <div className="star_count">
              {[...Array(review.stars)].map((star) => {
                return (
                  <span id="ratingStars" class="fa fa-star checked"></span>
                )
              })}
            </div>
              <span>{review.review}</span>
              <span>{review.user.username}</span>
              </div>
            )
          })}
          </div>
        </div>
              </div>
              <div className='detailDiv'>
                <p id='ownerId'></p>
                <div className='product_name'>
                <p id="avg">{avg}</p>
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
