import React from 'react';
import { reduxForm } from 'redux-form';

import { login } from '../actions'

class LoginForm extends React.Component {
  login() {
    this.props.dispatch(login(
      this.props.fields.email.value,
      this.props.fields.password.value
    ));
  }

  render() {
    const {fields: {email, password}, handleSubmit} = this.props;

    return (
      <form className="form" onSubmit={handleSubmit(this.login.bind(this))}>
        <div className='form-group'>
          <label for="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            {...email} />
        </div>
        <div className='form-group'>
          <label for="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="******"
            {...password} />
        </div>
        <button
        className="btn btn-default">Login</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(LoginForm);
