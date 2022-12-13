/* Author: Tomas Fiser, xfiser16 */
import axios from "axios";
import { Component } from "react";
import { Form, FormGroup, Button, Input, Label } from "reactstrap";
import { API_URL } from "../constants";

class NewMeasurement extends Component {
  state = { /* Structure containing data for database requests */
    date: "",
    weight: 0,
  };
  handleDate = (e) => {                   /* Handling date input */
    this.setState({ date: e.target.value });
  };

  handleWeight = (e) => {                 /* Handling weight input */
    this.setState({ weight: e.target.value });
  };

  addNewMeasurement = (e) => {
    e.preventDefault();

    console.log(this.state);

    const tokenString = localStorage.getItem("token");   /* Storage of access rights */
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .post(
        API_URL + "clients/measurement-list/", /* Request sending new measurement data */
        {
          date: this.state.date,
          weight: this.state.weight,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => console.log(response.data));
    this.props.toggle();
  };
  render() {     /* A function that renders something to the screen */
    return (
      <Form onSubmit={this.addNewMeasurement}>
        <FormGroup>              {/* Beginning of the form for new measurements */}
          <Label>Date and time:</Label>
          <Input
            required
            name="date"
            type="datetime-local"
            onChange={this.handleDate}
          />
        </FormGroup>
        <FormGroup>
          <Label>Weight (kg):</Label>
          <Input
            required
            name="weight"
            type="number"
            placeholder="70"
            onChange={this.handleWeight}
          />
        </FormGroup>
        <Button id="submit-new-workout-button">Send</Button>
      </Form>
    );
  }
}

export default NewMeasurement;
