import React from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';

import { logoutAndRedirect } from '../../actions';
import { NavLink } from '../';

class NavBar extends React.Component {
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
                <NavLink to="/" isIndex>Home</NavLink>
                {!isAuthenticated ? <NavLink to="/login">Login</NavLink> : null}
                {!isAuthenticated ? <NavLink to="/register">Register</NavLink> : null}
                {isAuthenticated ? <NavLink to="/dashboard">Dashboard</NavLink> : null}
              </ul>
            </div>
            {
              isAuthenticated ?
                <div className="navbar-right">
                  <p className="navbar-text">
                    Signed in as <Link to={`/profile/${userData.userID}`}>
                      {
                        userData.first_name ?
                          `${userData.first_name} ${userData.last_name}` :
                          `${userData.email}`
                      }
                    </Link>
                  </p>
                  <button className="btn btn-default navbar-btn" onClick={logout}>
                    Logout
                  </button>
                </div> :
              null
            }
          </div>
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  userData: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.userData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAndRedirect()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
