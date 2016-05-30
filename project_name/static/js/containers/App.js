import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { logout } from '../actions';
import { LoginForm } from '../forms';

class AppView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {status, statusType, isAuthenticated, userData} = this.props;
    const alertClass = classNames({
      'alert': true,
      [`alert-${statusType}`]: true
    });

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                Django / React / Redux
              </a>
            </div>
            {
              isAuthenticated ?
              <div className="navbar-right">
                <p className="navbar-text">Signed in as {userData.username}</p>
                <button className="btn btn-default navbar-btn" onClick={this.props.logout}>
                  Logout
                </button>
              </div> :
              ''
            }
          </div>
        </nav>

        <div className="container">
          <h1 className="page-header">Login Page</h1>
          {status ? <div className={alertClass} role="alert">{status}</div> : ''}
          { isAuthenticated ?  `Welcome ${userData.username}!` : <LoginForm /> }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.auth.get('status'),
    statusType: state.auth.get('statusType'),
    isAuthenticated: state.auth.get('isAuthenticated'),
    userData: state.auth.get('userData').toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView);
