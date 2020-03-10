import _ from 'lodash';

import jsonPlaceholder from '../api/jsonPlaceholder';

export const fetchPosts = () => {
  return async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data });
  };
};

/* export const fetchUser = id => dispatch => {
  _fetchUser(id, dispatch);
}; */
export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
});

// Wrong Method to implement Memoize
/* export const fetchUser = function(id) {
  return _.memoize(async function(dispatch) {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
  });
}; */
