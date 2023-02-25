import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getOrders } from '../../store/orders'
import noimage from '../../no_image/No_Image_Available.jpg'

function Orders() {
const dispatch = useDispatch()
const history = useHistory()
const orders = useSelector(state => state.orders)
let ordersArr = Object.values(orders)
console.log(ordersArr)
const user = useSelector(state => state.session.user)


useEffect(() => {
  if (user) dispatch(getOrders(user.id))
}, [dispatch])

return (
  <div>
    <div className="orders">
      {ordersArr.map((order) => {
        return (
          <li key={order.id}>
            <p>{order.total} Items</p>
            <p>${order.subTotal}</p>
            {order.orderItems[0].products.images.length == 0 ? <img className='img' src={noimage}></img>:
            <img className='img' src={order.orderItems[0].products.images[0].url}
              onError={(e)=>{ if (e.target.src !== noimage)
              { e.target.onerror = null; e.target.src=noimage; } }} alt='displayimg'></img>}
              <button id="order_details" onClick={history.push(`/orders/${order.id}`)}>View Order Details</button>
          </li>
        )
      })}
    </div>
  </div>
)
}

export default Orders
