import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';

import { logoutAndRedirect, dismissAuthStatus } from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { status, statusType, isAuthenticated, userData, logout } = this.props;

    const alertClass = classNames({
      'alert': true,
      'fade': true,
      'in': true,
      'alert-dismissible': true,
      [`alert-${statusType}`]: true
    });

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <IndexLink className="navbar-brand" to="/">
                Django / React / Redux
              </IndexLink>
            </div>
            <div>
              <ul className="nav navbar-nav">
                <li><IndexLink to="/">Home</IndexLink></li>
                { ! isAuthenticated ?  <li><Link to="/login">Login</Link></li> : null }
                { ! isAuthenticated ?  <li><Link to="/register">Register</Link></li> : null }
              </ul>
            </div>
            {
              isAuthenticated ?
              <div className="navbar-right">
                <p className="navbar-text">
                  Signed in as <Link to="/dashboard">{ userData.first_name ? `${userData.first_name} ${userData.last_name}` : `${userData.email}` }</Link>
                </p>
                <button className="btn btn-default navbar-btn" onClick={logout}>
                  Logout
                </button>
              </div> :
              ''
            }
          </div>
        </nav>
        <div className='container'>
          {
            status ?
            <div className={alertClass}>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                onClick={this.props.dismissStatus}>×</button>
              {status}
            </div> :
            null
          }
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.auth.status,
    statusType: state.auth.statusType,
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.userData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAndRedirect()),
    dismissStatus: () => dispatch(dismissAuthStatus()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
