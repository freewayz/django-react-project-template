import React from 'react';
import { reduxForm } from 'redux-form';

import { register } from '../actions'

class RegisterForm extends React.Component {
  register() {
    this.props.dispatch(register(this.props.fields));
  }

  render() {
    const {fields: {email, first_name, last_name, password, confirm_password}, handleSubmit} = this.props;

    return (
      <form className="form" onSubmit={handleSubmit(this.register.bind(this))}>
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
          <label for="first_name">First Name</label>
          <input
            type="first_name"
            className="form-control"
            id="first_name"
            placeholder="First Name"
            {...first_name} />
        </div>
        <div className='form-group'>
          <label for="last_name">Last Name</label>
          <input
            type="last_name"
            className="form-control"
            id="last_name"
            placeholder="Last Name"
            {...last_name} />
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
        <div className='form-group'>
          <label for="confirm_password">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirm_password"
            placeholder="******"
            {...confirm_password} />
        </div>
        <button
        className="btn btn-default">Register</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'register',
  fields: ['email', 'first_name', 'last_name', 'password', 'confirm_password']
})(RegisterForm);
