import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from '../stores';
import routes from '../routes';

export default class Root extends React.Component {
  render() {
    const history = syncHistoryWithStore(browserHistory, store);

    return (
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    );
  }
}
