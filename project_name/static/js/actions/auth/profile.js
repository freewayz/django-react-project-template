import { push } from 'react-router-redux';

import { checkStatus, parseJSON, getResponseBody } from '../../utils';
import { GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from '../../constants';

export function getProfileSuccess(profile) {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: {
      profile,
    },
  };
}

export function getProfileFailure(error) {
  return {
    type: GET_PROFILE_FAILURE,
    payload: {
      status: error.response.status,
    },
  };
}

export function getProfileRequest() {
  return {
    type: GET_PROFILE_REQUEST,
  };
}

export function getProfile(id) {
  return (dispatch) => fetch(`http://127.0.0.1:8000/api/v1/users/${id}/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(dispatch(getProfileRequest))
  .then(checkStatus)
  .then(parseJSON)
  .then(response => {
    dispatch(getProfileSuccess(response));
  })
  .catch(error => {
    const reader = error.response.body.getReader();
    getResponseBody(reader)
    .then((result) => {
      const e = error;
      e.body = result;
      dispatch(getProfileFailure(e));
      dispatch(push('/dashboard'));
    });
  });
}
