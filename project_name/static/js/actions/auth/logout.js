import { push } from 'react-router-redux';

import { LOGOUT_USER } from '../../constants';

export function logout() {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER,
  };
}

export function logoutAndRedirect() {
  return (dispatch) => {
    dispatch(logout());
    dispatch(push('/login'));
  };
}
