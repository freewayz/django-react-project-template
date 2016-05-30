import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import { HomeView, LoginView, RegisterView, DashboardView } from '../views';
import { mustAuth } from '../components/Authentication';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={HomeView} />
    <Route path="login" component={LoginView} />
    <Route path="register" component={RegisterView} />
    <Route path="dashboard" component={mustAuth(DashboardView)} />
  </Route>
);
