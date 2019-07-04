import React, { Component } from "react";
import BaseComponent from "./baseComponent";
import Joi from "joi-browser";
import Form from "./common/form";
import http from "./services/httpService";
import { notify } from "react-notify-toast";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };
  schema = {
    email: Joi.string()
      .required()
      .label("Username")
      .email(),
    password: Joi.string()
      .required()
      .label("Password")
  };

  registerUser = () => {
    window.location.href = "/register";
  };
  componentWillMount() {}

  doSubmit = () => {
    let self = this;

    http
      .call({
        method: "post",
        url: `/api/login`,
        headers: {
          "Content-Type": "application/json"
        },
        data: this.state.data
      })
      .then(response => {
        if (response.data.status >= 0) {
          localStorage.setItem("visonUserToken", JSON.stringify(response.data));

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
          {this.renderInput("email", "User Name", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
        <br /> <br />
        <h5 style={{ color: "red" }}>Not registered?</h5>
        <button
          onClick={this.registerUser}
          className="btn btn-secondary btn-lg"
        >
          Register
        </button>
      </div>
    );
  }
}

export default LoginForm;
