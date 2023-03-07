import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { updateItem, updateOrder, getOrder, deleteItem } from "../../store/orders";
import noimage from '../../no_image/No_Image_Available.jpg'

function UpdateOrder() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { orderId } = useParams()
  const orders = useSelector(state => Object.values(state.orders)[0])
  const orderItems = orders.orderItems
  let cost = orders.subTotal
  console.log(cost)
  let count = orders.total

  const user = useSelector(state => state.session.user)

  const increaseCount = async (id, productId, orderId, price) => {
    let itemPrice = price

    const payload = {
      productId,
      orderId,
      count: 1
    }

    let updatedItem = await dispatch(updateItem(payload, id))

    await updateOrderAdd(itemPrice)
    await dispatch(getOrder(orderId))
  }

  const updateOrderAdd = async (price) => {

    console.log(cost, "total")
    console.log(price, "price")
    let newCost = (Number(cost) + Number(price))
    console.log(newCost)

    const orderpayload = {
      userId: Number(user.id),
      total: Number(1),
      subTotal: Number(newCost)
    }

    let updatedOrder = await dispatch(updateOrder(orderpayload, orderId))
  }

  const decreaseCount = async (id, productId, orderId, price) => {
    let itemPrice = price

    const payload = {
      productId,
      orderId,
      count: -1
    }

    let updatedItem = await dispatch(updateItem(payload, id))

    await updateOrderRemove(itemPrice)
    await dispatch(getOrder(orderId))
  }

  const updateOrderRemove = async (price) => {

    console.log(cost, "total")
    console.log(price, "price")
    let newCost = (Number(cost) - Number(price))
    console.log(newCost)

    const orderpayload = {
      userId: Number(user.id),
      total: Number(-1),
      subTotal: Number(newCost)
    }

    let updatedOrder = await dispatch(updateOrder(orderpayload, orderId))
  }

  const deleteItemFromOrder = async (id, price) => {
    let deleted = await dispatch(deleteItem(id))

    let newCost = (Number(cost) - Number(price))
    const orderpayload = {
      userId: Number(user.id),
      total: Number(-1),
      subTotal: Number(newCost)
    }

    let updatedOrder = await dispatch(updateOrder(orderpayload, orderId))
  }


  useEffect(() => {
    dispatch(getOrder(orderId))
  }, [dispatch])

  return (
    <div id="single_order">
      {orderItems.length ? <div >
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
            <button onClick={e => increaseCount(item.id, item.productId, item.orderId, item.products.price)}>add</button>
            {Number(item.count) > 1 && <div>
              <button onClick={e => (decreaseCount(item.id, item.productId, item.orderId, item.products.price))}>subtract</button>
              </div>}
            {(orderItems.length > 1 && Number(item.count) <= 1) && <div>
              <button onClick={e => deleteItemFromOrder(item.id, item.products.price)}>delete</button>
              </div>}
            </div>
            </div>
        </li>
        )
      })}
    </div>
    <div className="order_details">
      <p className="order_price">{orders.total} Item(s): ${orders.subTotal}</p>
      <button id='delete_order_button'>Return</button>
      </div>
      </div>: <p>Nothing to show.</p>}
  </div>
  )
}

export default UpdateOrder
