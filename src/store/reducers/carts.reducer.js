import { types } from '../actions/carts.actions'

const initialState = [];

const cartsReducer = (state = initialState, action) => {
  let { type, payload } = action;
  let index;

  switch (type) {
    case types.SET_CARTS:
      state = payload;
      return state;

    case types.ADD_CART:
      state = [...state, payload];
      return state;
    
    case types.REMOVE_CART:
      index = state.findIndex(cart => cart.id === payload.id);
      state = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
      return state;
    
    case types.UPDATE_CART:
      index = state.findIndex(cart => cart.id === payload.id);
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

export default cartsReducer;