import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { LoginForm } from '../forms';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {status, statusType, isAuthenticated} = this.props;
    const alertClass = classNames({
      'alert': true,
      [`alert-${statusType}`]: true
    });

    return (
      <div>
        <h1 className="page-header">Login Page</h1>
        {status ? <div className={alertClass} role="alert">{status}</div> : ''}
        { isAuthenticated ?  `You are already authenticated!` : <LoginForm /> }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.auth.status,
    statusType: state.auth.statusType,
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
