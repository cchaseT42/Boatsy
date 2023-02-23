const LOAD = 'favorites/getFavorites'
const CREATE = 'favorites/createFavorites'
const DELETE = 'favorites/deleteFavorites'

const load = (favorites) => {
  return {
    type: LOAD,
    favorites
  }
}

const create = (favorite) => {
  return {
    type: CREATE,
    favorite
  }
}

const destroy = (favorite) => {
  return {
    type: DELETE,
    favorite
  }
}

export const getFavorites = (id) => async dispatch => {
  const response = await fetch(`/api/favorites/${id}`)
  if (response.ok) {
    const favorites = await response.json()
    dispatch(load(favorites))
  }
}

export const addFavorite = (data) => async dispatch => {
  const response = await fetch(`/api/favorites/add`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const newFavorite = await response.json()
  dispatch(create(newFavorite))
  return newFavorite
}

export const deleteFavorite = (userId, productId) => async dispatch => {
  const response = await fetch(`/api/favorites/${userId}/${productId}`, {
    method: 'delete',
  })
  if (response.ok){
    console.log(response)
    dispatch(destroy(userId, productId))
  }
}

let initialState = {}

const favorites = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const newState = {}
      let favoritesArr = action.favorites.favorite_items
      favoritesArr.forEach(favorite => {
        newState[favorite.id] = favorite
      })
      return newState
    }
    case CREATE: {
      const newState = {...state}
      newState[action.favorite.id] = action.favorite
      return newState
    }
    case DELETE: {
      const newState = {...state}
      delete newState[action.favorite.id]
      return newState
    }
    default: return state
  }
}

export default favorites
