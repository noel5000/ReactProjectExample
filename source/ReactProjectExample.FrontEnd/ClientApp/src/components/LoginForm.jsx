import React, { Component } from "react";
import BaseComponent from "./baseComponent";
import Joi from "joi-browser";
import httpService from "./services/httpService";
import Form from "./common/form";
import http from "./services/httpService";
import { notify } from "react-notify-toast";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };
  // schema = Joi.object()
  //   .keys({
  //     username: Joi.string()
  //       .alphanum()
  //       .min(6)
  //       .max(16)
  //       .required(),
  //     password: Joi.string()
  //       .regex(/^[a-zA-Z0-9]{6,16}$/)
  //       .min(6)
  //       .required()
  //   })
  //   .with("username", "password");

  doSubmit = () => {
    let self = this;
    http
      .call({
        method: "post",
        url: `/api/login`,
        headers: {
          "Content-Type": "application/json"
        },
        data: { userName: this.state.username, password: this.state.password }
      })
      .then(response => {
        if (response.data.status >= 0) {
          window.location.href = "/";
        } else {
          notify.show(response.data.message, "error", 1000);
        }
      })
      .catch(reason => {});
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "User Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
