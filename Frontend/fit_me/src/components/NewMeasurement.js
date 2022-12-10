import axios from "axios";
import { Component } from "react";
import { Form, FormGroup, Button, Input, Label } from "reactstrap";
import { API_URL } from "../constants";

class NewMeasurement extends Component {
    componentDidMount() {
    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .post(API_URL + "clients/measurement-list/", 
      {
        date: "",
        weight: "",
      },
      {
      headers: { Authorization: `Bearer ${accessToken}` },
      }
      )
      .then((response) => {
        this.setState(response.data);
      });
  }
  addNewMeasurement = (e) => {};

  render() {
    return (
      <Form onSubmit={this.addNewMeasurement}>
        <FormGroup>
          <Label>Date and time:</Label>
          <Input
            name="time"
            type="datetime-local"
            onChange={this.changeState}
            /* value={this.state.time} */
          />
        </FormGroup>
        <FormGroup>
          <Label>Weight (kg):</Label>
          <Input
            name="weight"
            type="number"
            placeholder="70"
            onChange={this.changeState}
            /* value={this.defaultIfEmpty(this.state.duration)} */
          />
        </FormGroup>
        <Button id="submit-new-workout-button">Send</Button>
      </Form>
    );
  }
}

export default NewMeasurement;
