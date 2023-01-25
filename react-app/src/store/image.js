
const CREATE = "image/createImg"
const UPDATE = 'image/createImg'
const DELETE = 'image/deleteImg'

const create = (image) => {
  return {
    type: CREATE,
    image
  }
}

const update = (image) => {
  return {
    type: UPDATE,
    image
  }
}

const destroy = (image) => {
  return {
    type: DELETE,
    image
  }
}

export const createImg = (data) => async dispatch => {
  const response = await fetch(`/api/images/create`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
  })
  const newImage = await response.json()
  dispatch(create(newImage))
  return newImage
}

export const updateImg = (data) => async dispatch => {
  const response = await fetch(`/api/images/update`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const updatedImg = await response.json()
  dispatch(update(updatedImg))
  return updatedImg
}

export const destroyImg = (imgId) => async dispatch => {
  const response = await fetch(`/api/images/${imgId}`, {
    method: 'delete'
  })
    if (response.ok){
      dispatch(destroy(imgId))
    }
}
