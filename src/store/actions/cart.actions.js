export const types = {
  ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART',
  REMOVE_PRODUCT_FROM_CART: 'REMOVE_PRODUCT_FROM_CART',
  UPDATE_CART_PRODUCT: 'UPDATE_CART_PRODUCT',
  CLEAR_CART: 'CLEAR_CART'
};

export const addProductToCart = (payload) => dispatch => {
  return dispatch({ type: types.ADD_PRODUCT_TO_CART, payload });
}

export const removeProductFromCart = (payload) => dispatch => {
  return dispatch({ type: types.REMOVE_PRODUCT_FROM_CART, payload });
}

export const updateCartProduct = payload => dispatch => {
  return dispatch({ type: types.UPDATE_CART_PRODUCT, payload });
}

export const clearCart = payload => dispatch => {
  return dispatch({ type: types.CLEAR_CART, payload });
}