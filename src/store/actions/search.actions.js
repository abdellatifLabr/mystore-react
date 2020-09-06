export const types = {
  SET_SEARCH: 'SET_SEARCH'
};

export const setSearch = (payload) => dispatch => {
  return dispatch({ type: types.SET_SEARCH, payload });
}