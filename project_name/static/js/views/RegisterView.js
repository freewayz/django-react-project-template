import React from 'react';
import { connect } from 'react-redux';

import { RegisterForm } from '../forms';

class RegisterView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticated} = this.props;

    return (
      <div>
        <h1 className="page-header">Register Page</h1>
        { isAuthenticated ?  `You are already authenticated!` : <RegisterForm /> }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterView);
