import { types } from '../actions/user.actions'

const initialState = null;

const userReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case types.SET_USER:
      state = payload;
      return state;
  
    default:
      return state;
  }
}

export default userReducer;