import axios from "axios";
import { Component } from "react";
import { Form, FormGroup, Button, Input, Label, Row, Col } from "reactstrap";
import { GrAddCircle } from "react-icons/gr";
import { FaTimes } from "react-icons/fa";
import { API_URL } from "../constants";

const workoutTypeOptions = [
  "Strength training",
  "High-intensity interval training",
  "High-intensity circuit training",
  "High-intensity strength training",
  "Powerbuilding",
  "Low-intensity cardio",
  "Aerobic",
];

class NewWorkoutForm extends Component {
  state = {
    clients: [],
    clientId: 0,
    time: "",
    duration: "",
    workoutType: "",
    exercises: [
      {
        name: "",
        num_of_sets: 0,
        num_of_reps: 0,
        description: null,
      },
    ],
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

  changeStateWorkoutClient = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");

    this.setState({ clientId: parseInt(option) });
  };

  addNewWorkout = (e) => {};

  /* changeFormDate(formTime) {
    this.setState({ time: formTime });
    console.log(this.state);
  }
 */

  /*  defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  }; */
  handleAddNewExercise = () => {
    const newExercise = {
      name: "leg press",
      num_of_sets: null,
      num_of_reps: null,
      description: null,
    };
    this.setState({ exercises: [...this.state.exercises, newExercise] });
  };

  handleChangeExercise(e, i) {
    const { name, value } = e.target;
    const exercises = [...this.state.exercises];
    exercises[i][name] = value;
    this.setState({ exercises: exercises });

    console.log(this.state.exercises);
  }
  handleRemoveExercise(i) {
    const exercises = [...this.state.exercises];
    exercises.splice(i, 1);
    this.setState({ exercises: exercises });
  }
  render() {
    return (
      <Form onSubmit={this.addNewWorkout}>
        <FormGroup>
          <Label>Client:</Label>
          <Input
            name="clientChosen"
            type="select"
            onChange={this.changeStateWorkoutClient}
          >
            <option value="" selected disabled hidden>
              Choose client
            </option>
            {this.state.clients.map((client) => (
              <option key={client.pk} id={client.pk}>
                {client.first_name + " " + client.last_name}
              </option>
            ))}
          </Input>
        </FormGroup>
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
          <Label>Duration (min):</Label>
          <Input
            name="duration"
            type="number"
            placeholder="45"
            onChange={this.changeState}
            /* value={this.defaultIfEmpty(this.state.duration)} */
          />
        </FormGroup>
        <FormGroup>
          <Label>Type:</Label>
          <Input name="workoutType" type="select" onChange={this.changeState}>
            <option value="" selected disabled hidden>
              Select workout type
            </option>
            {workoutTypeOptions.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Input>
        </FormGroup>
        <legend>Exercises:</legend>
        {this.state.exercises.map((x, i) => (
          <div class="workout-form-exercise">
            <Row>
              <Col id="workout-form-exercise-counter">
                <p>{i + 1}.</p>
              </Col>
              <Col id="remove-workout-form-icon">
                <FaTimes onClick={() => this.handleRemoveExercise(i)} />
              </Col>
            </Row>
            <Row>
              <FormGroup>
                <Label>Exercise name:</Label>
                <Input
                  name="name"
                  type="text"
                  onChange={(e) => this.handleChangeExercise(e, i)}
                ></Input>
              </FormGroup>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label>Number of sets:</Label>
                  <Input
                    name="num_of_sets"
                    type="number"
                    onChange={(e) => this.handleChangeExercise(e, i)}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>Number of reps:</Label>
                  <Input
                    name="num_of_reps"
                    type="number"
                    onChange={(e) => this.handleChangeExercise(e, i)}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <FormGroup>
                <Label>Description:</Label>
                <Input
                  name="description"
                  type="textarea"
                  onChange={(e) => this.handleChangeExercise(e, i)}
                ></Input>
              </FormGroup>
            </Row>
          </div>
        ))}
        <Row>
          <GrAddCircle
            id="workout-form-add-exercise-icon"
            onClick={this.handleAddNewExercise}
          />
        </Row>
        <Button id="submit-new-workout-button">Send</Button>
      </Form>
    );
  }
}

export default NewWorkoutForm;