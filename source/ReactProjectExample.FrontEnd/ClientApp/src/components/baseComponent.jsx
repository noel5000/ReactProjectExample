import React, { Component } from "react";

class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showPage: false };
  }
  isUserLogged() {
    return this.getCurrentToken() ? true : false;
  }

  logout() {
    localStorage.setItem("visonUserToken", "{}");
    window.location.href = "/";
  }

  allowedUrl = ["", "registrar", "login"];

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

  hideLoading() {
    var element = document.getElementById("loadingDiv");
    if (element != null) element.classList.add("invisible");
  }

  showLoading() {
    var element = document.getElementById("loadingDiv");
    if (element != null) element.classList.remove("invisible");
  }

  componentWillMount() {
    const currentUrl = window.location.pathname
      .split("?")[0]
      .split("/")[1]
      .toString();

    if (!this.isUserLogged() && this.allowedUrl.indexOf(currentUrl) < 0) {
      window.location.href = "/login";
      this.setState({ showPage: true });
    }
  }
}

export default BaseComponent;
