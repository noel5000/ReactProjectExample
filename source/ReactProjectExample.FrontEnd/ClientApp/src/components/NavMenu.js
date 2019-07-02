import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import BaseComponent from "./baseComponent";

export class NavMenu extends BaseComponent {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              Site example using .Net Core and React
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="m-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              {this.isUserLogged() ? (
                <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/counter">
                      Counter
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/fetch-data">
                      Fetch data
                    </NavLink>
                  </NavItem>
                </ul>
              ) : null}
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
