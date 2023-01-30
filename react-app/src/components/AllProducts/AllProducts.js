import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../store/product'
import './AllProducts.css'

function AllProducts(){
  const dispatch = useDispatch()

  const products = useSelector(state => state.products)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div className='container'>
      <div className='splash'>
        {!user && <h1 className='boatsy'> Welcome to boatsy</h1>}
        {user && <h1 className='boatsy'> Welcome back {user.username}</h1>}
      </div>
      <div className='flex'>
        {Object.values(products).map((product) => {
          return (
            <li key={product.id} className='product'>
              <div className="DivCont">
              <span>
              <Link to={`/products/${product.id}`}>
              {product.images.length == 0 ? <img className='img'></img>:<img className='img' src={product.images[0].url} alt=''></img>}
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
