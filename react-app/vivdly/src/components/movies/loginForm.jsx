import React from "react";
import Joi from "joi-browser";
import Form from "../common/form/form";
import { login } from "../../services/authService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
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
    try {
      const { data } = this.state
      await login(data.email, data.password)
      window.location = '/'

    } catch (ex) {
      const errors = { ...this.state.errors} ;
      console.log('hdhjjdjdjd', errors)
      errors.email = ex.response.data;
      this.setState({ errors });
    }
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;