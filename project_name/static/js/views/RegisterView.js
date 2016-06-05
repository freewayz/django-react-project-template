import React from 'react';
import { connect } from 'react-redux';

import { RegisterForm } from '../forms';

class RegisterView extends React.Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>
        <h1 className="page-header">Register Page</h1>
        {isAuthenticated ? 'You are already authenticated!' : <RegisterForm />}
      </div>
    );
  }
}

RegisterView.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(RegisterView);
