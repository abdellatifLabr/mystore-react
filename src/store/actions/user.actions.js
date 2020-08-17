export const types = {
  SET_USER: 'SET_USER'
};

export const setUser = (payload) => dispatch => {
  return dispatch({ type: types.SET_USER, payload });
}