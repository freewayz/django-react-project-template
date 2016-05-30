import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import { HomeView, LoginView } from '../views';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={HomeView} />
    <Route path="login" component={LoginView} />
  </Route>
);
