import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <Navbar
        collapseOnSelect
        color="dark"
        dark
        expand="sm"
        fixed="top"
        bg="dark"
        variant="dark"
      >
        <NavbarBrand href="">
          <img
            alt="logo"
            src="./fitme-logo.png"
            style={{
              height: 50,
              width: 100,
            }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="#">Clients</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Workouts</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Stats</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
