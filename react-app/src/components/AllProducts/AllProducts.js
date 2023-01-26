import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../store/product'
import './AllProducts.css'

function AllProducts(){
  const dispatch = useDispatch()

  const products = useSelector(state => state.products)

  console.log(products)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div className='container'>
        {Object.values(products).map((product) => {
          return (
            <li key={product.id} className='product'>
              {/* <span>
                <p>{product.productName}</p>
              </span>
              <span>
                <p>{product.productDescription}</p>
              </span> */}
              <div className="DivCont">
              <span>
              <Link to={`/products/${product.id}`}>
              {product.images.length == 0 ? <img className='img'></img>: <img className='img' src={product.images[0].url} alt=''></img>}
              <span id="displayCont">
                <span className='curr'>$</span>
                <span className='price'>{product.price}</span>
              </span>
              </Link>
              </span>
              </div>
            </li>
          )
        })}
    </div>
  )
}

export default AllProducts
