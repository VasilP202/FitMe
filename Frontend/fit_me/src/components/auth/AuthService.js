/* Author: Vasil Poposki,  xpopos00*/

import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Register from "./Register";
import Login from "./Login";
import "./AuthService.css";

export default function AuthService({ setToken }) {
  /* Authentication component. Provides registration and login options. */
  return (
    <div>
      <Row className="" id="brand-row">
        <a href="/">
          <img
            alt="logo"
            src="./fitme-logo.png"
            style={{
              height: 50,
              width: 120,
            }}
          />
        </a>
      </Row>
      <Row id="help-text-row">
        <h5>Please create an account or log in to your existing account.</h5>
      </Row>
      <Container id="auth-service-container">
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/login"
              element={<Login setToken={setToken} />}
            ></Route>
          </Routes>
        </BrowserRouter>
        <Container id="auth-options">
          <Row className="auth-options-row">
            <Col className="bg-light border">
              <h5>
                <a href="/register">Register here</a>
              </h5>
            </Col>
          </Row>
          <Row className="auth-options-row">
            <Col className="bg-light border">
              <h5>
                <a href="/login">Login here</a>
              </h5>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
