import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProduct } from "../../store/product"
import './SingleProduct.css'


function SingleProduct(){

  const dispatch = useDispatch()
  const { productId } = useParams()
  const product = useSelector(state => state.products)


  useEffect(() => {
    dispatch(getProduct(productId))
  }, [dispatch])

  console.log(product)

  return (
    <div className="ProductDetails">
      {Object.values(product).map((product) => {
          return (
            <li key={product.id} className='product'>
              <span>
                <p>{product.productName}</p>
              </span>
              <span>
                <p>{product.productDescription}</p>
              </span>
              <span>
                <p>${product.price}</p>
              </span>
              <span>
              <img className='img' src={product.images[0].url} alt=''/>
              </span>
            </li>
          )
        })}
    </div>
  )
}

export default SingleProduct
