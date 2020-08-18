import { types } from '../actions/cart.actions'

const initialState = [];

const cartReducer = (state = initialState, action) => {
  let { type, payload } = action;
  let index;

  switch (type) {
    case types.ADD_PRODUCT_TO_CART:
      state = [...state, payload];
      return state;
    
    case types.REMOVE_PRODUCT_FROM_CART:
      index = state.findIndex(cartProduct => cartProduct.product.id === payload);
      state = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
      return state;
    
      case types.UPDATE_CART_PRODUCT:
        index = state.findIndex(cartProduct => cartProduct.product.id === payload.product.id);
        state = [
          ...state.slice(0, index),
          payload,
          ...state.slice(index + 1)
        ];
        return state;
  
    default:
      return state;
  }
}

export default cartReducer;