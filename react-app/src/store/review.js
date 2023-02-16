const LOAD = 'review/getReview'
const CREATE = "review/createReview"
const UPDATE = 'review/updateReview'
const DELETE = 'review/deleteReview'


const load = (review) => {
  return {
    type: LOAD,
    review
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

export const createReview = (data) => async dispatch => {
  console.log(data)
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

export const updateReview = (data) => async dispatch => {
  const response = await fetch(`/api/review/update`, {
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
