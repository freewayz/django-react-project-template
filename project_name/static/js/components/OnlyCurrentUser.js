import React from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';

export function onlyCurrentUser(Component) {
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
      if (userID != routeID) {
        this.props.dispatch(push(`/profile/${routeID}`));
      }
    }

    render () {
      return (
        <div>
          {
            this.props.userID == this.props.params.id ?
            <Component {...this.props}/> :
            null
          }
        </div>
      )

    }
  }

  const mapStateToProps = (state) => ({
    userID: state.auth.userData.userID,
  });

  return connect(mapStateToProps)(OnlyCurrentUser);
}
