const LOAD = "order/getOrders"
const LOADONE = "order/getOrder"
const CREATE = "order/createOrder"
const CREATEITEM = "order/createItem"
const DELETE = "order/deleteOrder"

const load = (orders) => {
  return {
    type: LOAD,
    orders
  }
}

const loadone = (order) => {
  return {
    type: LOADONE,
    order
  }
}

const create = (order) => {
  return {
    type: CREATE,
    order
  }
}

const createitem = (orderItem) => {
  return {
    type: CREATEITEM,
    orderItem
  }
}

const destroy = (order) => {
  return {
    type: DELETE,
    order
  }
}

export const getOrders = (id) => async dispatch => {
  const response = await fetch(`/api/orders/user/${id}`)
  if (response.ok) {
    const orders = await response.json()
    dispatch(load(orders))
  }
}
export const getOrder = (id) => async dispatch => {
  const response = await fetch(`/api/orders/${id}`)
  if (response.ok) {
    const order = await response.json()
    dispatch(loadone(order))
  }
}
export const createOrder = (data) => async dispatch => {
  const response = await fetch(`/api/orders/create`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const newOrder = await response.json()
  dispatch(create(newOrder))
  return newOrder
}
export const addOrderItem = (data) => async dispatch => {
  const response = await fetch(`/api/orders/add`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const newItem = await response.json()
  dispatch(createitem(newItem))
  return newItem
}
export const deleteOrder = (orderid) => async dispatch => {
  const response = await fetch(`/api/orders/${orderid}`, {
    method: 'delete'
  })
  if (response.ok){
    dispatch(destroy(orderid))
  }
}

let initialState = {}

const orders = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const newState = {}
      let ordersArr = Object.values(action.orders.orders)
      ordersArr.forEach(order => {
        newState[order.id] = order
      })
      return newState
    }
    case CREATE: {
      const newState = {...state}
      newState[action.order.id] = action.order
      return newState
    }
    case LOADONE: {
      const newState = {[action.order.id]: action.order}
      return newState
    }
    case DELETE: {
      const newState = {...state}
      delete newState[action.order.id]
      return newState
    }
    default: return state
  }
}

export default orders
