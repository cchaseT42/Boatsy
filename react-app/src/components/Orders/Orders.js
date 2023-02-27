import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getOrders } from '../../store/orders'
import './Orders.css'
import noimage from '../../no_image/No_Image_Available.jpg'

function Orders() {
const dispatch = useDispatch()
const history = useHistory()
const orders = useSelector(state => state.orders)
let ordersArr = Object.values(orders)
console.log(ordersArr)
const user = useSelector(state => state.session.user)

const redirect = async (id) => {
  await history.push(`/orders/${id}`)
}


useEffect(() => {
  if (user) dispatch(getOrders(user.id))
}, [dispatch])

return (
  <div>
    {ordersArr.length > 0 ? <div className="orders">
      {ordersArr.map((order) => {
        return (
          <li key={order.id}>
            <div className="order">
              <div className="orderDetails">
            {order.orderItems[0].products.images.length == 0 ? <img className='img' src={noimage}></img>:
            <img className='img' src={order.orderItems[0].products.images[0].url}
              onError={(e)=>{ if (e.target.src !== noimage)
              { e.target.onerror = null; e.target.src=noimage; } }} alt='displayimg'></img>}
              <div>
              <p id="detail">{order.total} Items</p>
              <p id="detail">${order.subTotal}</p>
              </div>
              </div>
              <button id="details_button" onClick={e => redirect(order.id)}>View Order Details</button>
              </div>
          </li>
        )
      })}
    </div> : <div className='no_orders'><h1 className='count_total'>No orders to display.
    Buy somethin' will ya!</h1></div>}
  </div>
)
}

export default Orders
