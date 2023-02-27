import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getOrder } from '../../store/orders'
import noimage from '../../no_image/No_Image_Available.jpg'

function SingleOrder() {
  const dispatch = useDispatch()
  const history = useHistory()
  const {orderId} = useParams()
  const orders = useSelector(state => Object.values(state.orders)[0])
  const orderItems = orders.orderItems

  console.log(orderItems)
  const user = useSelector(state => state.session.user)

  console.log(orders)


  useEffect(() => {
    if (user) dispatch(getOrder(orderId))
  }, [dispatch])

  return (
    <div>
      <div className="orderItems">
        {orderItems.map((item) => {
          return(
          <li key={item.id}>
            {item.products.images.length == 0 ? <img className='img' src={noimage}></img>:
            <img className='img' src={item.products.images[0].url}
              onError={(e)=>{ if (e.target.src !== noimage)
              { e.target.onerror = null; e.target.src=noimage; } }} alt='displayimg'></img>}
              <p>{item.products.productDescription}</p>
          </li>
          )
        })}
      </div>
    </div>
  )
}

export default SingleOrder
