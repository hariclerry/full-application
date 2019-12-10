import React from "react";
import Joi from "joi-browser";
import Form from "../common/form/form";
import { register } from "../../services/userService";
import { loginWithJwt } from "../../services/authService";

class RegistrationForm extends Form {
  state = {
    data: { name: "", email: "" , password: ""},
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
    .required()
    .label("Email"),
    password: Joi.string()
    .required()
    .min(5)
    .label("Password")
  };

  doSubmit = async () => {
    // Call the server
    try 
    {
      const response = await register(this.state.data)
      loginWithJwt(response.headers['x-auth-token'])
      window.location = '/'
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors} ;
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email", 'email')}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;