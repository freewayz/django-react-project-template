import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App } from '../containers';
import { mustAuth, onlyCurrentUser } from '../components';
import {
  HomeView,
  LoginView,
  RegisterView,
  ProfileView,
  ProfileEditView,
  DashboardView,
  ChangePasswordView
} from '../views';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={HomeView} />
    <Route path="login" component={LoginView} />
    <Route path="register" component={RegisterView} />
    <Route path="profile/:id" component={ProfileView} />

    // Authenticated Views
    <Route path="profile/:id/edit" component={mustAuth(onlyCurrentUser(ProfileEditView))} />
    <Route path="dashboard" component={mustAuth(DashboardView)} />
    <Route path="password" component={mustAuth(ChangePasswordView)} />
  </Route>
);
