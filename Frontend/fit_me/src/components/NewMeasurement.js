import axios from "axios";
import { Component } from "react";
import { Form, FormGroup, Button, Input, Label } from "reactstrap";
import { API_URL } from "../constants";

class NewMeasurement extends Component {
  handleDate = (e) => {
    this.setState({ setDate: e.target.value });
  };

  handleWeight = (e) => {
    this.setState({ setWeight: e.target.value });
  };

  addNewMeasurement() {
    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .post(API_URL + "clients/measurement-list/", 
      {
        date: this.state.setDate,
        weight: this.state.setWeight,
      },
      {
      headers: { Authorization: `Bearer ${accessToken}` },
      }
      )
      .then((response) => console.log(response.data));
  }
  render() {
    return (
      <Form>
        <FormGroup>
          <Label>Date and time:</Label>
          <Input
            name="date"
            type="datetime-local"
            onChange={this.handleDate}
          />
        </FormGroup>
        <FormGroup>
          <Label>Weight (kg):</Label>
          <Input
            name="weight"
            type="number"
            placeholder="70"
            onChange={this.handleWeight}
          />
        </FormGroup>
        <Button onSubmit={this.addNewMeasurement} id="submit-new-workout-button">Send</Button>
      </Form>
    );
  }
}

export default NewMeasurement;
