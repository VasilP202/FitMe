import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";
import WorkoutsSummaryList from "./WorkoutsSummaryList";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class Home extends Component {
  state = {
    workouts: [],
    date: null,
  };
  componentDidMount() {
    axios
      .get(API_URL + "workouts/")
      .then((response) => this.setState({ workouts: response.data }));
  }
  toggleWorkoutDone(workout) {
    axios
      .post(API_URL + "workouts/workout-done/", {
        workout_id: workout.pk,
        workout_done: !workout.done,
      })
      .then(
        setTimeout(() => {
          axios.get(API_URL + "workouts/").then((response) => {
            console.log(response);
            console.log(this);
            this.setState({ workouts: response.data });
          });
        }, 100)
      );
  }
  render() {
    console.log(this.state.date);
    return (
      <Container id="home">
        <Row>
          <Col xs="8" sm="8">
            <WorkoutsSummaryList
              workouts={this.state.workouts}
              onToggle={this.toggleWorkoutDone.bind(this)}
            />
          </Col>
          <Col xs="auto" sm="auto">
            <Calendar
              onChange={(date) => this.setState({ date: date })}
              value={this.state.date}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
