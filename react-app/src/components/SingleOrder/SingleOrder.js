import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Link } from 'react-router-dom'
import { deleteOrder, getOrder } from '../../store/orders'
import noimage from '../../no_image/No_Image_Available.jpg'
import './SingleOrder.css'

function SingleOrder() {
  const dispatch = useDispatch()
  const history = useHistory()
  const {orderId} = useParams()
  const orders = useSelector(state => Object.values(state.orders)[0])
  const orderItems = orders.orderItems

  const user = useSelector(state => state.session.user)


  const destroyOrder = async (id) => {
    await dispatch(deleteOrder(id))
    await history.push('/orders')
  }


  useEffect(() => {
    if (user) dispatch(getOrder(orderId))
  }, [dispatch])

  return (
    <div id="single_order">
      <div className="orderItems">
        {orderItems.map((item) => {
          return(
          <li key={item.id}>
            <div className="order_item">
              <Link to={`/products/${item.products.id}`}>
              <div className="order_img">
            {item.products.images.length == 0 ? <img className='img' src={noimage}></img>:
            <img className='img' src={item.products.images[0].url}
              onError={(e)=>{ if (e.target.src !== noimage)
              { e.target.onerror = null; e.target.src=noimage; } }} alt='displayimg'></img>}
              </div>
              </Link>
              <div className="item_details">
              <p>Amount: {item.count}</p>
              <p>{item.products.productName}</p>
              <p>${item.products.price}</p>
              </div>
              </div>
          </li>
          )
        })}
      </div>
      <div className="order_details">
        <p className="order_price">{orders.total} Item(s): ${orders.subTotal}</p>
        <button id='delete_order_button' onClick={e => destroyOrder(orders.id)}>Cancel Order</button>
        <button id='delete_order_button' onClick={e => history.push(`/orders/update/${orderId}`)}>Edit Order</button>
        </div>
    </div>
  )
}

export default SingleOrder
