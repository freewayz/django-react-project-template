import React from 'react';
import { render } from 'react-dom';
import { List, Map } from 'immutable';
import { Provider } from 'react-redux';

import { App } from './containers/App';
import store from './stores'
import { loginUserSuccess } from './actions';

const mountNode = document.getElementById('app');

let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(loginUserSuccess(token, false));
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode
)
