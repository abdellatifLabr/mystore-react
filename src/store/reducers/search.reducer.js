import { types } from '../actions/search.actions'

const initialState = null;

const searchReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case types.SET_SEARCH:
      state = payload;
      return state;
  
    default:
      return state;
  }
}

export default searchReducer;