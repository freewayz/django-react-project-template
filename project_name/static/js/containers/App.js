import React from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';

import { logoutAndRedirect } from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticated, userData, logout } = this.props;

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
                <li><Link to="/login">Login</Link></li>
              </ul>
            </div>
            {
              isAuthenticated ?
              <div className="navbar-right">
                <p className="navbar-text">Signed in as {userData.username}</p>
                <button className="btn btn-default navbar-btn" onClick={logout}>
                  Logout
                </button>
              </div> :
              ''
            }
          </div>
        </nav>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.userData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAndRedirect())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
