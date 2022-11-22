import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";
import WorkoutsSummaryList from "./WorkoutsSummaryList";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Header from "./Header";

class Home extends Component {
  state = {
    workouts: [],
    date: null,
  };
  componentDidMount() {
    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .get(API_URL + "workouts/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
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
            this.setState({ workouts: response.data });
          });
        }, 100)
      );
  }
  render() {
    return (
      <div>
        <Header />
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
      </div>
    );
  }
}

export default Home;
