const LOAD = 'review/getReview'
const LOADALL='review/getAllReviews'
const CREATE = "review/createReview"
const UPDATE = 'review/updateReview'
const DELETE = 'review/deleteReview'


const load = (review) => {
  return {
    type: LOAD,
    review
  }
}

const loadall = (reviews) => {
  return {
    type: LOADALL,
    reviews
  }
}

const create = (review) => {
  return {
    type: CREATE,
    review
  }
}

const update = (review) => {
  return {
    type: UPDATE,
    review
  }
}

const destroy = (review) => {
  return {
    type: DELETE,
    review
  }
}

export const getReview = (reviewId) => async dispatch => {
  const response = await fetch(`/api/review/${reviewId}`)
  if (response.ok) {
    const review = await response.json()
    dispatch(load(review))
  }
}

export const getAllReviews = (productId) => async dispatch => {
  const response = await fetch(`/api/review/product`)
  if (response.ok) {
    const reviews = await response.json()
    dispatch(loadall(reviews))
  }
}

export const createReview = (data) => async dispatch => {
  const response = await fetch(`/api/review/create`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
  })
  const newreview = await response.json()
  dispatch(create(newreview))
  return newreview
}

export const updateReview = (id, data) => async dispatch => {
  const response = await fetch(`/api/review/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const updatedReview = await response.json()
  dispatch(update(updatedReview))
  return updatedReview
}

export const destroyReview = (id) => async dispatch => {
  const response = await fetch(`/api/review/${id}`, {
    method: 'delete'
  })
    if (response.ok){
      dispatch(destroy(id))
    }
}

let initialState = {}

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const newState = [action.review]
      return newState
    }
    case LOADALL: {
      const newState = {}
      let reviewArr = action.reviews.reviews
      reviewArr.forEach(product => {
        newState[product.id] = product
      })
      return newState
    }
    case CREATE: {
      const newState = {...state}
      newState[action.review.id] = action.review
      return newState
    }
    case UPDATE: {
      const newState = {...state}
      newState[action.review.id] = action.review
      return newState
    }
    case DELETE: {
      const newState = {...state}
      delete newState[action.review.id]
      return newState
    }
    default: return state
  }
}

export default reviews
