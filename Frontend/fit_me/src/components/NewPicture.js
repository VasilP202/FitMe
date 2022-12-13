/* Author: Tomas Fiser, xfiser16 */
import axios from "axios";
import { Component } from "react";
import { Form, FormGroup, Button, Input, Label, Upload } from "reactstrap";
import { API_URL } from "../constants";

class NewPicture extends Component {
  /* This component is not supported yet, maybe soon */
  componentDidMount() { 
    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .post(API_URL + "clients/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        this.setState({ clients: response.data });
      });
  }

  addNewPicture = (e) => {};


  render() {
    return (
      <Form onSubmit={this.addNewPicture}> {/* Form for file upload */}
        <FormGroup>
          <Label>Choose picture:</Label>
          <Input
            name="file"
            type="file"
            accept=".jpg, .jpeg, .png"     /* Supported data types */
            onChange={this.changeState}
          />
        </FormGroup>
        <Button id="submit-new-workout-button">Send</Button>
      </Form>
    );
  }
}

export default NewPicture;
