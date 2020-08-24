export const types = {
  SET_CARTS: 'SET_CARTS',
  ADD_CART: 'ADD_CART',
  REMOVE_CART: 'REMOVE_CART',
  UPDATE_CART: 'UPDATE_CART'
};

export const setCarts = (payload) => dispatch => {
  return dispatch({ type: types.SET_CARTS, payload });
}

export const addCart = (payload) => dispatch => {
  return dispatch({ type: types.ADD_CART, payload });
}

export const removeCart = (payload) => dispatch => {
  return dispatch({ type: types.REMOVE_CART, payload });
}

export const updateCart = (payload) => dispatch => {
  return dispatch({ type: types.UPDATE_CART, payload });
}