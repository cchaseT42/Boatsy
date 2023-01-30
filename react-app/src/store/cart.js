
const LOAD = 'cart/getCart'
const CREATE = 'cart/addCart'
const DELETE = 'cart/deleteCart'

const load = (cart) => {
  return {
    type: LOAD,
    cart
  }
}

const create = (cart) => {
  return {
    type: CREATE,
    cart
  }
}


const destroy = (cart) => {
  return {
    type: DELETE,
    cart
  }
}

export const getCart = (id) => async dispatch => {
  const response = await fetch(`/api/cart/${id}`)
  if (response.ok) {
    const cart = await response.json()
    dispatch(load(cart))
  }
}

export const createCart = (data) => async dispatch => {
  console.log("data:", data)
  const response = await fetch(`/api/cart/add`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const newCart = await response.json()
  console.log("newCart", newCart)
  dispatch(create(newCart))
  return newCart
}

export const deleteCart = (id) => async dispatch => {
  const response = await fetch(`/api/cart/${id}`, {
    method: 'delete'
  })
    if (response.ok){
      dispatch(destroy(id))
    }
}

let initialState = {}

const carts = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const newState = {}
      const cartsArr = action.cart.cart_items
      cartsArr.forEach(cart_item => {
        newState[cart_item.id] = cart_item
      })
      return newState
    }
    case CREATE: {
      const newState = {...state}
      newState[action.cart.id] = action.cart
      return newState
    }
    case DELETE: {
      const newState = {...state}
      delete newState[action.cart.id]
      return newState
    }
    default: return state
  }
}

export default carts
