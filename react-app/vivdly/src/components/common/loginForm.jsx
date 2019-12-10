import React, { Component } from 'react';
import Input from './inputField';

class Login extends Component {
  state = {
    account: {
      email: '',
      password: ''
    },
    errors: {}
  };
  handleSubmit = e => {
    e.preventDefault()

    const errors = this.validateFormErrors()
    this.setState({ errors: errors || {} })
    if  (errors) return;

    // Call the server
    console.log('Submitted')
  }

  validateFormErrors = () => {
    const errors = {}
    const { account } = this.state
    if (account.email.trim() === '') {
      errors.email = 'Email is required.';
    }
    if (account.password.trim() === '') {
      errors.password = 'Password is required.';
    }

    return Object.keys(errors).length === 0 ? null : errors
    }

  validateFieldProperty = ({ name, value }) => {
    if (name === "email") {
      if (value.trim() === '') return "Email is required"
    }
    if (name === "password") {
      if (value.trim() === '') return "Password is required"
      if (value.length < 4 ) return "Password is too short"
    }
  }

  handleChange = ({target:input}) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateFieldProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account }
    account[input.name] = input.value
    this.setState({
      account, errors
    })

  }
  render() {
    const { account, errors } = this.state
    return (
      <div>
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <Input 
              onChange={this.handleChange}
              value={account.email}
              label="Email Address"
              name="email"
              placeholder="Enter email"
              errors={errors.email}
          />
          <Input 
              onChange={this.handleChange}
              value={account.password}
              label="Password"
              name="password"
              placeholder="Password"
              errors={errors.password}
          />
          <button type="submit" className="btn btn-primary" disabled={this.validateFormErrors()}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
