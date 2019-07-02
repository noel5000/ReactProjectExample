import React, { Component } from "react";
import BaseComponent from "./baseComponent";
import Joi from "joi-browser";
import httpService from "./services/httpService";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = Joi.object()
    .keys({
      username: Joi.string()
        .alphanum()
        .min(6)
        .max(16)
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{6,16}$/)
        .min(6)
        .required()
    })
    .with("username", "password");

  doSubmit = () => {
    this.showLoading();
    let self = this;
    httpService.call();
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" className="form-control" />
          </div>

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
