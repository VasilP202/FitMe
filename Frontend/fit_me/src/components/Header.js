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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { FaUserAlt } from "react-icons/fa";
class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
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
          <Nav navbar>
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
          <Nav className="ms-auto">
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle nav caret>
                <FaUserAlt style={{ color: "white", fontSize: "35px" }} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink href="/login">Login</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink href="/register">Register</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
      </Navbar>
    );
  }
}

export default Header;
