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
    duration: 0,
    workoutType: "",
    exercises: [
      {
        name: "",
        num_of_sets: 0,
        num_of_reps: 0,
        description: "",
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

  addNewWorkout = (e) => {
    e.preventDefault();

    if (
      this.state.exercises.length() > 0 &&
      this.state.exercises[0]["name"] != ""
    ) {
      const exercises = this.state.exercises;
    console.log(exercises);

    } else {
      const exercises = [];
      console.log(exercises);
    }


    /* axios.post(API_URL + "workouts/", {
      client: this.state.clientId,
      time: this.state.time,
      exercises: this.state.exercises,
    });

    console.log(this.state); */

    //this.props.toggle();
  };

  changeStateWorkoutClient = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");

    this.setState({ clientId: parseInt(option) });
  };

  handleAddNewExercise = () => {
    const newExercise = {
      name: "",
      num_of_sets: 0,
      num_of_reps: 0,
      description: "",
    };
    this.setState({ exercises: [...this.state.exercises, newExercise] });
  };

  handleChangeExercise(e, i) {
    const { name, value } = e.target;
    const exercises = [...this.state.exercises];
    exercises[i][name] = value;
    this.setState({ exercises: exercises });
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
            required
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
            required
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
          <Input
            name="workoutType"
            type="select"
            required
            onChange={this.changeState}
          >
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
          <div className="workout-form-exercise">
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
