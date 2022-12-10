import axios from "axios";
import { Component } from "react";
import { Form, FormGroup, Button, Input, Label } from "reactstrap";
import { API_URL } from "../constants";

class NewMeasurement extends Component {
  state = {
    clientId: 0,
    time: "",
    weight: "",
  };

  componentDidMount() {
    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .get(API_URL + "clients/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        this.setState({ clients: response.data });
      });
  }

  changeState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
