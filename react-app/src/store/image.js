
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
