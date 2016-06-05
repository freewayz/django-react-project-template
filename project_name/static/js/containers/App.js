import React from 'react';

import { NavBar, StatusAlert } from '../views';

export class App extends React.Component {
  render() {
    const children = this.props.children;
    return (
      <div>
        <NavBar />
        <div className="container">
          <StatusAlert />
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};
