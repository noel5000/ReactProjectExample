import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import BaseComponent from "./../baseComponent";

class Form extends Component {
  state = { data: {}, errors: {} };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  getCurrentToken() {
    const currentUser = this.getCurrentUser();
    if (
      !currentUser.token ||
      !currentUser.expiration ||
      currentUser.expiration < new Date()
    ) {
      const currentUrl = window.location.pathname
        .split("?")[0]
        .split("/")[1]
        .toString();
      localStorage.setItem("visonUserToken", "{}");
      if (this.allowedUrl.indexOf(currentUrl) < 0)
        window.location.href = "/login";
      return "";
    } else return currentUser.token;
  }

  getCurrentUser() {
    let currentUserJson = localStorage.getItem("visonUserToken");
    currentUserJson = !currentUserJson ? "{}" : currentUserJson;
    return JSON.parse(currentUserJson);
  }
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleChangeDelegated = input => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  eventFire(el, etype) {
    if (el.fireEvent) {
      el.fireEvent("on" + etype);
    } else {
      var evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

  renderButton = (label, additionalClasses = "") => {
    const classes = `btn btn-primary ${additionalClasses}`;
    return (
      <button disabled={this.validate()} className={classes}>
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { errors, data } = this.state;
    return (
      <Input
        name={name}
        id={name}
        error={errors[name]}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        type={type}
      />
    );
  };

  renderInputWithChangeHandler = (
    name,
    label,
    type = "text",
    changeHandler
  ) => {
    const { errors, data } = this.state;
    return (
      <Input
        name={name}
        id={name}
        error={errors[name]}
        value={data[name]}
        label={label}
        onChange={changeHandler}
        type={type}
      />
    );
  };
}

export default Form;
