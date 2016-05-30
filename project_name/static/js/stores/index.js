import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk'

import reducers from '../reducers';

const router = routerMiddleware(browserHistory);

export default createStore(
  reducers,
  applyMiddleware(thunk, router)
);
