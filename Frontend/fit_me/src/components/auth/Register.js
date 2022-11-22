import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Alert,
} from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AUTH_URL } from "../../constants/index";

async function register(data) {
  return axios
    .post(AUTH_URL + "register/", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: error.response.data };
    });
}

export default function Register() {
  const nav = useNavigate();

  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  const [roleClient, setRoleClient] = useState(false);
  const [roleTrainer, setRoleTrainer] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register({
      email,
      first_name: firstName,
      last_name: lastName,
      username,
      password,
      password2,
      is_client: roleClient,
      is_trainer: roleTrainer,
    });
    if (response.error) {
      setErrorMsg(JSON.stringify(response.error, null, 2));
    } else {
      nav("/login");
    }
  };

  const setRole = (roleName) => {
    if (roleName === "setClient") {
      setRoleClient(true);
      setRoleTrainer(false);
    } else {
      setRoleClient(false);
      setRoleTrainer(true);
    }
  };

  return (
    <Container id="register-container">
      <Row className="auth-service-title">
        <h1>Register</h1>
      </Row>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="FirstName">First Name</Label>
          <Input
            type="text"
            name="firstName"
            id="FirstName"
            placeholder="John"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="LastName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            id="LastName"
            placeholder="Smith"
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="UserName">Username</Label>
          <Input
            type="text"
            name="username"
            id="UserName"
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Email">Email</Label>
          <Input
            type="email"
            name="email"
            id="Email"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Password">Password</Label>
          <Input
            type="password"
            name="password"
            id="Password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Password2">Confirm Password</Label>
          <Input
            type="password"
            name="password"
            id="Password2"
            placeholder="********"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </FormGroup>

        <FormGroup tag="fieldset">
          <legend>Select your role here:</legend>
          <FormGroup check>
            <Label check>
              <Input
                id="setClient"
                type="radio"
                name="radio1"
                onChange={(e) => setRole(e.target.id)}
              />
              I'm client
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                id="setTrainer"
                type="radio"
                name="radio1"
                onChange={(e) => setRole(e.target.id)}
              />
              I'm trainer
            </Label>
          </FormGroup>
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
