import axios from "axios";
import { Component } from "react";
import { Form, FormGroup, Button, Input, Label} from "reactstrap";
import { API_URL } from "../constants";

const sexChoices = ["MALE", "FEMALE"];

class NewClientForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    sex: "MALE",
    birth_date: null,
    email: "",
    phone: null,
  };

  componentDidMount() {
    if (this.props.client) {
      const { pk, first_name, last_name, email, phone } = this.props.client;
      this.setState({ pk, first_name, last_name, email, phone });
    }
  }

  changeState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewClient = (e) => {
    e.preventDefault();

    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .post(API_URL + "clients/", this.state, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(this.props.toggle());
  };

  editClient = (e) => {
    e.preventDefault();

    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .put(API_URL + "clients/" + this.props.client.pk + "/", this.state, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(this.props.toggle());
  };


  render() {
    return (
      <Form onSubmit={this.props.client ? this.editClient : this.addNewClient}>
        <FormGroup>
          <Label>First name:</Label>
          <Input
            name="first_name"
            type="text"
            required
            onChange={this.changeState}
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label>Last name:</Label>
          <Input
            name="last_name"
            type="text"
            required
            onChange={this.changeState}
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label>Birth date:</Label>
          <Input name="birth_date" type="date" onChange={this.changeState} />
        </FormGroup>

        <FormGroup>
          <Label>Sex:</Label>
          <Input name="sex" type="select" required onChange={this.changeState}>
            {sexChoices.map((choice) => (
              <option key={choice}>{choice}</option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>Email:</Label>
          <Input
            name="email"
            type="email"
            required
            onChange={this.changeState}
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label>Phone:</Label>
          <Input
            name="phone"
            type="tel"
            onChange={this.changeState}
          ></Input>
        </FormGroup>

        <Button id="submit-new-workout-button">Submit</Button>
      </Form>
    );
  }
}

export default NewClientForm;
