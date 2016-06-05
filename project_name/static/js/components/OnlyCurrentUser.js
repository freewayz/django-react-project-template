import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function onlyCurrentUser(Component) {
  class OnlyCurrentUser extends React.Component {
    componentWillMount() {
      this.checkUser(
        this.props.userID,
        this.props.params.id
      );
    }

    componentWillReceiveProps(nextProps) {
      this.checkUser(
        nextProps.userID,
        nextProps.params.id
      );
    }

    checkUser(userID, routeID) {
      if (userID !== parseInt(routeID, 10)) {
        this.props.dispatch(push(`/profile/${routeID}`));
      }
    }

    render() {
      return (
        <div>
          {
            this.props.userID === parseInt(this.props.params.id, 10) ?
              <Component {...this.props} /> :
            null
          }
        </div>
      );
    }
  }

  OnlyCurrentUser.propTypes = {
    userID: React.PropTypes.number.isRequired,
    params: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

  function mapStateToProps(state) {
    return {
      userID: state.auth.userData.userID,
    };
  }

  return connect(mapStateToProps)(OnlyCurrentUser);
}
