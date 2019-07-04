import React, { Component } from "react";
import BaseComponent from "./baseComponent";
import Joi from "joi-browser";
import httpService from "./services/httpService";
import Form from "./common/form";
import { notify } from "react-notify-toast";

class Register extends Form {
  state = {
    data: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      verifyPassword: ""
    },
    errors: {}
  };
  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    lastName: Joi.string()
      .required()
      .label("Last Name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password"),
    verifyPassword: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    const user = {
      name: this.state.data.name,
      lastName: this.state.data.lastName,
      email: this.state.data.email,
      password: this.state.data.password,
      verifyPassword: this.state.data.verifyPassword
    };

    if (user.password != user.verifyPassword) {
      notify.show("Password is not correct", "error", 1000);
      return;
    }
    httpService
      .call({
        method: "post",
        url: `/api/register`,
        headers: {
          "Content-Type": "application/json"
        },
        data: user
      })
      .then(response => {
        if (response.data.status >= 0) {
          notify.show("User registered successfully", "success", 3000);
          localStorage.setItem("visonUserToken", JSON.stringify(response.data));
          window.setTimeout(function() {
            window.location.href = "/";
          }, 1000);
        }
      })
      .catch(response => {
        notify.show(
          "Could not process the request. Please try later",
          "error",
          1000
        );
      });
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Registration</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("verifyPassword", "Verify Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Register;
