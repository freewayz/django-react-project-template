import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function mustAuth(Component) {
  class Authentication extends React.Component {
    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        const redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
      }
    }

    render() {
      return (
        <div>
          {
            this.props.isAuthenticated === true ?
              <Component {...this.props} /> :
            null
          }
        </div>
      );
    }
  }

  Authentication.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    location: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  }

  return connect(mapStateToProps)(Authentication);
}
