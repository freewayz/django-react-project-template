import React from 'react';
import { reduxForm } from 'redux-form';

import { register } from '../actions'
import { formGroupClass } from '../utils';

export const fields = ['email', 'first_name', 'last_name', 'password', 'confirm_password'];

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
  if (!values.confirm_password) {
    errors.confirm_password = 'Confirm password is required';
  } else if (values.password != values.confirm_password) {
    errors.confirm_password = 'Your passwords do not match';
  }

  return errors
}

class RegisterForm extends React.Component {
  register() {
    this.props.dispatch(register(this.props.fields));
  }

  render() {
    const {fields: {email, first_name, last_name, password, confirm_password}, handleSubmit, submitting} = this.props;

    return (
      <form className="form" onSubmit={handleSubmit(this.register.bind(this))}>
        <div className={formGroupClass(email)}>
          <label for="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Email" {...email} />
          {email.touched && email.error && <p className="help-block">{email.error}</p>}
        </div>
        <div className={formGroupClass(first_name)}>
          <label for="first_name">First Name</label>
          <input type="first_name" className="form-control" id="first_name" placeholder="First Name" {...first_name} />
          {first_name.touched && first_name.error && <p className="help-block">{first_name.error}</p>}
        </div>
        <div className={formGroupClass(last_name)}>
          <label for="last_name">Last Name</label>
          <input type="last_name" className="form-control" id="last_name" placeholder="Last Name" {...last_name} />
          {last_name.touched && last_name.error && <p className="help-block">{last_name.error}</p>}
        </div>
        <div className={formGroupClass(password)}>
          <label for="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="******" {...password} />
          {password.touched && password.error && <p className="help-block">{password.error}</p>}
        </div>
        <div className={formGroupClass(confirm_password)}>
          <label for="confirm_password">Confirm Password</label>
          <input type="password" className="form-control" id="confirm_password" placeholder="******" {...confirm_password} />
          {confirm_password.touched && confirm_password.error && <p className="help-block">{confirm_password.error}</p>}
        </div>
        <button className="btn btn-default" type="submit" disabled={submitting}>
          {submitting ? <i/> : <i/>} Register
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'register',
  fields,
  validate
})(RegisterForm);
