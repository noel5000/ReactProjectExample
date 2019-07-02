import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import LoginForm from "./components/LoginForm";
import BaseComponent from "./components/baseComponent";
import Notifications, { notify } from "react-notify-toast";

export default class App extends BaseComponent {
  static displayName = App.name;

  render() {
    return (
      <div>
        <Notifications />
        <Layout>
          <Route
            exact
            path="/"
            component={this.isUserLogged() ? Home : LoginForm}
          />
          <Route path="/counter" component={Counter} />
          <Route path="/fetch-data" component={FetchData} />
          <Route path="/login" component={LoginForm} />
        </Layout>
      </div>
    );
  }
}
