import _ from 'lodash';

import jsonPlaceholder from '../api/jsonPlaceholder';

export const fetchPostsAndUsers = id => async (dispatch, getState) => {
  // console.log('About to fetch posts');
  await dispatch(fetchPosts());
  // console.log('fetched posts');
  // console.log(getState().posts);

  /* const userIds = _.uniq(_.map(getState().posts, 'userId'));
  console.log(userIds);
  userIds.forEach(id => dispatch(fetchUser(id))); */

  // Alternative Option: To implement the same as the above
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => {
  return async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data });
  };
};

// Alternate Solution on fetching Issue
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};

// Resolving the issue in fetching the Users one time
/* export const fetchUser = id => dispatch => {
  _fetchUser(id, dispatch);
}; */
/* export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
}); */

// Wrong Method to implement Memoize
/* export const fetchUser = function(id) {
  return _.memoize(async function(dispatch) {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
  });
}; */
