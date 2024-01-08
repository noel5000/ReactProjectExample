import React, { Component } from "react";
import BaseComponent from "./baseComponent";

class Stock extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Id</th>
              <th>Id</th>
              <th>Id</th>
              <th>Id</th>
              <th>Id</th>
              <th>Id</th>
              <th>Id</th>
              <th>Id</th>
              <th>Id</th>
              <th>Id</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default Stock;
