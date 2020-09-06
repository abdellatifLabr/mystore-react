import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import cartsReducer from './carts.reducer';
import searchReducer from './search.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  carts: cartsReducer,
  search: searchReducer
});

export default rootReducer;
