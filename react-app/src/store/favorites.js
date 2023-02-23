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
    default: return state
  }
}

export default favorites
