import React from 'react';
import { connect } from 'react-redux';

import { NavLink } from '../';

class ProfileNav extends React.Component {
  render() {
    const { isAuthenticated, userData, params } = this.props;
    const canEdit = isAuthenticated && userData.userID === parseInt(params.id, 10);

    return (
      <div>
        {
          canEdit ?
            <div>
              <ul className="nav nav-pills">
                <NavLink to={`/profile/${userData.userID}`}>
                  View Profile
                </NavLink>
                <NavLink to={`/profile/${userData.userID}/edit`}>
                  Edit Profile
                </NavLink>
                <NavLink to={`/profile/${userData.userID}/password`}>
                  Change Password
                </NavLink>
              </ul>
              <hr />
            </div> :
          null
        }
      </div>
    );
  }
}

ProfileNav.propTypes = {
  params: React.PropTypes.object.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  userData: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.userData,
  };
}

export default connect(mapStateToProps)(ProfileNav);
