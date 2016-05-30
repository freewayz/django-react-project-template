import React from 'react';
import { render } from 'react-dom';

import store from './stores';
import { Root } from './containers';
import { loginUserSuccess } from './actions';

const mountNode = document.getElementById('app');

let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(loginUserSuccess(token, false));
}

render(<Root />, mountNode)
