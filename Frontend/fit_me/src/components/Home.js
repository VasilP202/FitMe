import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";
import WorkoutsSummaryList from "./WorkoutsSummaryList";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TrainerForms from "./TrainerForms";
import ClientForms from "./ClientForms";

class Home extends Component {
  state = {
    workouts: [],
    datetime: new Date(),
  };

  componentDidMount() {
    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .get(API_URL + "workouts/", {
        params: {
          date: this.state.datetime,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => this.setState({ workouts: response.data }));
  }

  toggleWorkoutDone(workout) {
    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .post(API_URL + "workouts/workout-done/", {
        workout_id: workout.pk,
        workout_done: !workout.done,
      })
      .then(
        setTimeout(() => {
          axios
            .get(API_URL + "workouts/", {
              params: {
                date: this.state.datetime,
              },
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              this.setState({ workouts: response.data });
            });
        }, 100)
      );
  }

  toggleClientCame(workout) {
    const client_came =
      workout.client_came === null ? false : !workout.client_came;

    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .post(API_URL + "workouts/workout-client-came/", {
        workout_id: workout.pk,
        client_came: client_came,
      })
      .then(
        setTimeout(() => {
          axios
            .get(API_URL + "workouts/", {
              params: {
                date: this.state.datetime,
              },
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              this.setState({ workouts: response.data });
            });
        }, 100)
      );
  }

  changeDateHandler(date) {
    this.setState({ datetime: date });
    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .get(API_URL + "workouts/", {
        params: {
          date: date,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => this.setState({ workouts: response.data }));
  }
  render() {
    let forms;
    const isTrainer = localStorage.getItem("is_trainer");
    if (isTrainer === "true") forms = <TrainerForms />;
    forms = <ClientForms />;
    return (
      <div>
        <Container id="home">
          {forms}
          <Row>
            <Col xs="8" sm="8">
              <WorkoutsSummaryList
                workouts={this.state.workouts}
                datetime={this.state.datetime}
                onToggleWorkoutDone={this.toggleWorkoutDone.bind(this)}
                onToggleClientCame={this.toggleClientCame.bind(this)}
              />
            </Col>
            <Col xs="auto" sm="auto">
              <Calendar
                onChange={this.changeDateHandler.bind(this)}
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
