import React from 'react';
import { reduxForm } from 'redux-form';

import { login } from '../actions';
import { formGroupClass } from '../utils';

export const fields = ['email', 'password'];

const validate = values => {
  const errors = {};

  // Validate email
  if (!values.email) {
    errors.email = 'Email is required';
  }

  // Validate password
  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

class LoginForm extends React.Component {
  login() {
    this.props.dispatch(login(
      this.props.fields.email.value,
      this.props.fields.password.value
    ));
  }

  render() {
    const { fields: { email, password }, handleSubmit, submitting } = this.props;

    return (
      <form className="form" onSubmit={handleSubmit(this.login.bind(this))}>
        <div className={formGroupClass(email)}>
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Email" {...email} />
          {email.touched && email.error && <p className="help-block">{email.error}</p>}
        </div>
        <div className={formGroupClass(password)}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="******"
            {...password}
          />
          {password.touched && password.error && <p className="help-block">{password.error}</p>}
        </div>
        <button className="btn btn-default" type="submit" disabled={submitting}>
          {submitting ? <i /> : <i />} Login
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'login',
  fields,
  validate,
})(LoginForm);
