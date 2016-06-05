import React from 'react';

import { ProfileNav } from './';

export default class ProfileView extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Profile Edit Page</h1>

        <ProfileNav {...this.props} />
      </div>
    );
  }
}
