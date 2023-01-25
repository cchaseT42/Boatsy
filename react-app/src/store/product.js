
const LOAD = 'product/getProducts'
const PRODUCTLOAD = 'product/getProduct'
const CREATE = 'product/createProduct'
const UPDATE = 'product/updateProduct'
const DELETE = 'product/deleteProduct'

const load = (products) => {
  return {
    type: LOAD,
    products
  }
}

const productLoad = (product) => {
  return {
    type: PRODUCTLOAD,
    product
  }
}

const create = (product) => {
  return {
    type: CREATE,
    product
  }
}

const update = (product) => {
  return {
    type: UPDATE,
    product
  }
}

const destroy = (product) => {
  return {
    type: DELETE,
    product
  }
}

export const getProducts = () => async dispatch => {
  const response = await fetch(`/api/products/`)
  if (response.ok) {
    const products = await response.json()
    dispatch(load(products))
  }
}

export const getProduct = (productId) => async dispatch => {
  const response = await fetch(`/api/products/${productId}`)
  if (response.ok) {
    const product = await response.json()
    dispatch(productLoad(product))
  }
}

export const createProduct = (data) => async dispatch => {
  const response = await fetch(`/api/products/sell`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const newProduct = await response.json()
  dispatch(create(newProduct))
  return newProduct
}

let initialState = {}

const products = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const newState = {}
      let productsArr = action.products.products
      productsArr.forEach(product => {
        newState[product.id] = product
      })
      return newState
    }
    case PRODUCTLOAD: {
      const newState = {[action.product.id]: action.product}
      return newState
    }
    case CREATE: {
      const newState = {...state}
      newState[action.product.id] = action.product
      return newState
    }
    case UPDATE: {
      const newState = {...state}
      newState[action.question.id] = action.question
      return newState
    }
    case DELETE: {
      const newState = {...state}
      delete newState[action.questionId]
      return newState
    }
    default: return state
  }
}

export default products
