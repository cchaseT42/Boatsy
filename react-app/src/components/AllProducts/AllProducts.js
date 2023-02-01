import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../store/product'
import './AllProducts.css'
import noimage from '../../no_image/No_Image_Available.jpg'

function AllProducts(){
  const dispatch = useDispatch()

  const products = useSelector(state => state.products)
  const user = useSelector(state => state.session.user)

  const productsArr6 = Object.values(products).slice(0, 6)
  const productsArr7on = Object.values(products).slice(6)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

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
              {product.images.length == 0 ? <img className='img' src={noimage}></img>:<img className='img' src={product.images[0].url} alt=''></img>}
             <div>
             <span id="displayCont">
                <span className='curr'>$</span>
                <span className='price'>{product.price}</span>
              </span>
              </div>
              </Link>
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
