import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getProfile } from '../actions';

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getProfile(this.props.params.id);
  }

  render() {
    const { isAuthenticated, userData, profile, profileRequested } = this.props

    let isUsersProfile = isAuthenticated && userData.userID == this.props.params.id;

    return (
      <div>
        {
          profileRequested ?
          'LOADING PROFILE...' :
          <div>
            <h1 className="page-header">Profile Page</h1>

            {
              isUsersProfile ?
              <div>
                <Link to={`/profile/${userData.userID}/edit`} className="btn btn-default">Edit Profile</Link>
                <Link to="/password" className="btn btn-default">Change Password</Link>
              </div> :
              null
            }

            <hr />

            <form className="form-horizontal">
              <div className="form-group">
                <label className="col-sm-2 control-label">Email</label>
                <div className="col-sm-10">
                  <p className="form-control-static">{profile.email}</p>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">First Name</label>
                <div className="col-sm-10">
                  <p className="form-control-static">{profile.first_name}</p>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Last Name</label>
                <div className="col-sm-10">
                  <p className="form-control-static">{profile.last_name}</p>
                </div>
              </div>
            </form>
          </div>
        }
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profileRequested: state.auth.profileRequested,
    userData: state.auth.userData,
    profile: state.auth.currentProfile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProfile: (id) => dispatch(getProfile(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView);
