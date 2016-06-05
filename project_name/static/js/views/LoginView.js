import React from 'react';
import { connect } from 'react-redux';

import { LoginForm } from '../forms';

class LoginView extends React.Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>
        <h1 className="page-header">Login Page</h1>
        {isAuthenticated ? 'You are already authenticated!' : <LoginForm />}
      </div>
    );
  }
}

LoginView.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(LoginView);
