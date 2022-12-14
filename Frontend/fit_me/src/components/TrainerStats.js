/* Author: Tomas Fiser, xfiser16 */
import React, { Component } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBProgress,
  MDBProgressBar,
} from "mdb-react-ui-kit";
import "../App.css";
import "../Stats.css";
import ClientForms from "./ClientForms";
import axios from "axios";
import { API_URL, AUTH_URL } from "../constants";
import { Line, Bar } from "react-chartjs-2";
import { Chart as chartjs } from "chart.js/auto";

class TrainerStats extends Component {
  state = {
    trainerInfo: [],
    stats: [],
  };

  componentDidMount() {
    const tokenString =
      localStorage.getItem("token"); /* Storage of access rights */
    const accessToken = JSON.parse(tokenString)?.access;

    axios
      .get(AUTH_URL + "trainer-personal-info/", {
        /* DB request for trainer personal info */
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        this.setState({ trainerInfo: response.data });
      });

    axios
      .get(API_URL + "workouts/trainer-stats/", {
        /* DB request for trainer stats */
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        this.setState({ stats: response.data });
      });
  }

  render() {
    /* A function that renders something to the screen */
    let whoIS; /* Saving the type of logged in user */
    const isTrainer =
      localStorage.getItem(
        "is_trainer"
      ); /*Saving a multidimensional array for further processing*/
    const arr =
      this.state.stats
        .workouts_by_type_count; /*Saving a multidimensional array for further processing*/
    if (isTrainer === "false") {
      whoIS = "CLIENT";
    } else {
      whoIS = "TRAINER";
    }

    return (
      <section
        style={{ backgroundColor: "#fff", position: "relative", top: "80px" }}
      >
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1">{whoIS}</p>
                <p className="text-muted mb-1">
                  {localStorage.getItem("username")}
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
          <MDBRow>
            <MDBCol md="6">
              {" "}
              {/* Beginning of the section displaying personal data */}
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Name:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {this.state.trainerInfo.first_name +
                          " " +
                          this.state.trainerInfo.last_name}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="6">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {this.state.trainerInfo.email}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>{" "}
            {/* End of the section displaying personal data */}
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCard className="mb-4">
              {" "}
              {/* Graph showing the trainer stats */}
              <MDBCardBody className="text-center">
                <MDBCardText className="mb-1">Trainer stats</MDBCardText>
                <Bar
                  data={{
                    labels: [
                      "My clients count",
                      "Male clients",
                      "Female clients",
                      "Clients last month",
                    ],
                    datasets: [
                      {
                        label: "Count",
                        data: [
                          this.state.stats.clients_count,
                          this.state.stats.clients_male_count,
                          this.state.stats.clients_female_count,
                          this.state.stats.clients_last_month_count,
                        ],
                        backgroundColor: [
                          "#bababa",
                          "#198722",
                          "#f44336",
                          "#ffd966",
                        ],
                      },
                    ],
                  }}
                />
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4">
              {" "}
              {/* Graph showing the trainer stats */}
              <MDBCardBody className="text-center">
                <Bar
                  data={{
                    labels: [
                      "Clients under 20",
                      "Clients from 20 to 30",
                      "Clients from 30 to 40",
                      "Clients from 40 to 50",
                      "Clients above 50",
                    ],
                    datasets: [
                      {
                        label: "Count",
                        data: [
                          this.state.stats.clients_age_under_20,
                          this.state.stats.clients_age_20_to_30,
                          this.state.stats.clients_age_30_to_40,
                          this.state.stats.clients_age_40_to_50,
                          this.state.stats.clients_age_above_50,
                        ],
                        backgroundColor: [
                          "#22ABD4",
                          "#22D49B",
                          "#32D422",
                          "#B1D422",
                          "#D49922",
                        ],
                      },
                    ],
                  }}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCard className="mb-4">
              {" "}
              {/* Graph showing the stats of workouts */}
              <MDBCardBody className="text-center">
                <MDBCardText className="mb-1">Workout stats</MDBCardText>
                <Bar
                  data={{
                    labels: [
                      "All workouts",
                      "Workouts done",
                      "Workouts canceled",
                      "Workouts in last tree months",
                    ],
                    datasets: [
                      {
                        label: "Count",
                        data: [
                          this.state.stats.workouts_scheduled_count,
                          this.state.stats.workouts_scheduled_count -
                            this.state.stats.workouts_client_absent_count,
                          this.state.stats.workouts_client_absent_count,
                          this.state.stats.workouts_three_months_count,
                        ],
                        backgroundColor: [
                          "#bababa",
                          "#198722",
                          "#f44336",
                          "#ffd966",
                        ],
                      },
                    ],
                  }}
                />
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4">
              {" "}
              {/* Graph showing the stats about type of workouts */}
              <MDBCardBody className="text-center">
                <MDBCardText className="mb-1">
                  Workout counts by type of workout
                </MDBCardText>
                <Bar
                  data={{
                    labels: arr?.map((types) => types.type),
                    datasets: [
                      {
                        label: "Count",
                        data: arr?.map((counts) => counts.count),
                        backgroundColor: [
                          "#8022D4",
                          "#22ABD4",
                          "#22D49B",
                          "#32D422",
                          "#B1D422",
                          "#D49922",
                          "#D43D22",
                        ],
                      },
                    ],
                  }}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}

export default TrainerStats;
