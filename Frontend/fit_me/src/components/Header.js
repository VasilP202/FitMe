import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import "./Header.css";

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

  logout() {
    localStorage.removeItem("token");
  }

  render() {
    return (
      <Navbar
        color="dark"
        dark
        expand="sm"
        fixed="top"
        bg="dark"
        variant="dark"
      >
        <NavbarBrand tag={Link} to="/">
          <img
            alt="logo"
            src="./fitme-logo.png"
            style={{
              height: 50,
              width: 120,
            }}
          />
        </NavbarBrand>
        <Nav navbar>
        <NavItem>
              <NavLink tag={Link} to="/clients" >Clients</NavLink>
          </NavItem>
          <NavItem>
              <NavLink tag={Link} to="/stats">Stats</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ms-auto">
          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>
              <FaUserAlt style={{ color: "white", fontSize: "35px" }} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>{localStorage.getItem("username")}</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClickCapture={this.logout}>
                <NavLink href="/">Log Out</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
