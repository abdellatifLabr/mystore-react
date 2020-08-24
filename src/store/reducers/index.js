import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import cartsReducer from './carts.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  carts: cartsReducer
});

export default rootReducer;
