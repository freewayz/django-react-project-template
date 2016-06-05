import React from 'react';
import { connect } from 'react-redux';

import { getProfile } from '../actions';
import { ProfileNav } from './';

class ProfileView extends React.Component {
  componentWillMount() {
    this.props.getProfile(this.props.params.id);
  }

  render() {
    const { profile, profileRequested } = this.props;

    return (
      <div>
        {
          profileRequested ?
          'LOADING PROFILE...' :
            <div>
              <h1 className="page-header">Profile Page</h1>

              <ProfileNav {...this.props} />

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

ProfileView.propTypes = {
  getProfile: React.PropTypes.func.isRequired,
  profile: React.PropTypes.object.isRequired,
  profileRequested: React.PropTypes.bool.isRequired,
  params: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profileRequested: state.auth.profileRequested,
    userData: state.auth.userData,
    profile: state.auth.currentProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfile: (id) => dispatch(getProfile(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView);
