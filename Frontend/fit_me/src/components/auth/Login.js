/* Author: Vasil Poposki,  xpopos00*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Alert,
  Container,
} from "reactstrap";

import { AUTH_URL } from "../../constants/index";
import { useNavigate } from "react-router-dom";
import "./AuthService.css";

async function login(username, password) {
  /* If successful, return token from the backend. */
  return axios
    .post(AUTH_URL + "login/", {
      username,
      password,
    })
    .then((response) => {
      localStorage.setItem("username", username);
      return response.data;
    })
    .catch((error) => {
      console.log("Error", error.message);
    });
}

function setIsUserTrainer(username) {
  /* Get user role information and store it in the browser local storage. */
  return axios
    .get(AUTH_URL + "user-is-trainer/", {
      params: {
        username: username,
      },
    })
    .then((response) => {
      localStorage.setItem("is_trainer", response.data["is_trainer"]);
      return response.data;
    });
}

export default function Login({ setToken }) {
  /* Login component. Stores username and password in the state. */
  const nav = useNavigate();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await login(username, password);
    if (token) {
      setToken(token);
      setIsUserTrainer(username);
      nav("/");
      window.location.reload(false);
    } else {
      setErrorMsg("Login failed. Please try again.");
    }
  };

  return (
    <Container id="login-container">
      <Row className="auth-service-title">
        <h1>Log In</h1>
      </Row>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>
            <p>Username</p>
            <Input
              type="text"
              name="username"
              id="UserName"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Label>
        </FormGroup>

        <FormGroup>
          <Label>
            <p>Password</p>
            <Input
              type="password"
              name="password"
              id="Password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Label>
        </FormGroup>

        <FormGroup>
          <Button>Submit</Button>
        </FormGroup>
      </Form>
      <Row>
        {errorMsg.length > 0 ? (
          <Alert color="danger">
            <h5>{errorMsg}</h5>
          </Alert>
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
