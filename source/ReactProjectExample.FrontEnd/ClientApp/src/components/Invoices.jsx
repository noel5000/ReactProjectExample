import React, { Component } from "react";
import BaseComponent from "./baseComponent";

class Invoices extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Invoices</h1>
      </div>
    );
  }
}

export default Invoices;
