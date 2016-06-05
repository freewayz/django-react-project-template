import React from 'react';
import { reduxForm } from 'redux-form';

import { register } from '../actions';
import { formGroupClass } from '../utils';

export const fields = ['email', 'firstName', 'lastName', 'password', 'confirm'];

const validate = values => {
  const errors = {};

  // Validate email
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // Validate password
  if (!values.password) {
    errors.password = 'Password is required';
  }

  // Validate confirm password
  if (!values.confirm) {
    errors.confirm = 'Confirm password is required';
  } else if (values.password !== values.confirm) {
    errors.confirm = 'Your passwords do not match';
  }

  return errors;
};

class RegisterForm extends React.Component {
  register() {
    this.props.dispatch(register(this.props.fields));
  }

  render() {
    const {
      fields: {
        email,
        firstName,
        lastName,
        password,
        confirm,
      },
      handleSubmit,
      submitting,
    } = this.props;

    return (
      <form className="form" onSubmit={handleSubmit(this.register.bind(this))}>
        <div className={formGroupClass(email)}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            {...email}
          />
          {email.touched && email.error && <p className="help-block">{email.error}</p>}
        </div>
        <div className={formGroupClass(firstName)}>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            placeholder="First Name"
            {...firstName}
          />
          {firstName.touched && firstName.error && <p className="help-block">{firstName.error}</p>}
        </div>
        <div className={formGroupClass(lastName)}>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            placeholder="Last Name"
            {...lastName}
          />
          {lastName.touched && lastName.error && <p className="help-block">{lastName.error}</p>}
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
        <div className={formGroupClass(confirm)}>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirm_password"
            placeholder="******"
            {...confirm}
          />
          {confirm.touched && confirm.error && <p className="help-block">{confirm.error}</p>}
        </div>
        <button className="btn btn-default" type="submit" disabled={submitting}>
          {submitting ? <i /> : <i />} Register
        </button>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'register',
  fields,
  validate,
})(RegisterForm);
