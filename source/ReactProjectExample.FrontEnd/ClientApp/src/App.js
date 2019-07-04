import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import LoginForm from "./components/LoginForm";
import BaseComponent from "./components/baseComponent";
import Notifications, { notify } from "react-notify-toast";
import Register from "./components/Register";
import Invoices from "./components/Invoices";
import Products from "./components/Products";
import ProductsForm from "./components/ProductForm";

export default class App extends BaseComponent {
  static displayName = App.name;

  render() {
    return (
      <div>
        <Notifications />
        <ToastContainer />
        <Layout>
          <div>
            <Switch>
              <Route path="/products/:id" component={ProductsForm} />
              <Route
                exact
                path="/"
                component={this.isUserLogged() ? Home : LoginForm}
              />

              <Route path="/register" component={Register} />
              <Route path="/Invoices" component={Invoices} />
              <Route path="/products" component={Products} />
              <Route path="/login" component={LoginForm} />
            </Switch>
          </div>
        </Layout>
      </div>
    );
  }
}
