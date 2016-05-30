import React from 'react';
import { connect } from 'react-redux';

import { LoginForm } from '../forms';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticated} = this.props;

    return (
      <div>
        <h1 className="page-header">Login Page</h1>
        { isAuthenticated ?  `You are already authenticated!` : <LoginForm /> }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
