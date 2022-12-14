/* Authors: Vasil Poposki,  xpopos00
           Tomas Fiser, xfiser16*/
import React, { Component } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";
import "../App.css";
import "../Stats.css";
import axios from "axios";
import { API_URL } from "../constants";
import { Line, Bar } from "react-chartjs-2";

class Stats extends Component {
  state = {
    /* Structure containing data from database requests */ measurements: [],
    workouts: [],
    personalInfo: {},
  };

  componentDidMount() {
    const tokenString =
      localStorage.getItem("token"); /* Storage of access rights */
    const accessToken = JSON.parse(tokenString)?.access;

    let params = {};
    if (this.props.clientId) {
      params["id"] = this.props.clientId;
    }

    axios
      .get(API_URL + "clients/measurement-list/", {
        /* DB request for user measurements */ params: params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        this.setState({ measurements: response.data });
      });

    axios
      .get(API_URL + "clients/workout-stats/", {
        /* DB request for user statistics */ params: params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        this.setState({ workouts: response.data });
      });

    axios
      .get(API_URL + "clients/personal-info/", {
        /* DB request for user personal infomations, like name */
        params: params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        this.setState({ personalInfo: response.data });
      });
  }
  render() {
    /* A function that renders something to the screen */
    const trainer =
      this.state.personalInfo
        .trainer; /*Saving a multidimensional array for further processing*/
    const arr =
      this.state.workouts
        .workouts_by_type_count; /*Saving a multidimensional array for further processing*/

    let whoIS;
    const isTrainer = localStorage.getItem("is_trainer");
    if (isTrainer === "false") {
      whoIS = "CLIENT";
    } else {
      whoIS = "TRAINER";
    }
    return (
      <section
        style={{ backgroundColor: "#fff", position: "relative", top: "-40px" }}
      >
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCard className="mb-4">
              {" "}
              {/* Beginning of the section displaying personal data */}
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Name:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {this.state.personalInfo.first_name +
                        " " +
                        this.state.personalInfo.last_name}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {this.state.personalInfo.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {this.state.personalInfo.phone}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Birth:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {this.state.personalInfo.birth_date}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>{" "}
            {/* End of the section displaying personal data */}
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardText className="mb-1">Weight progress</MDBCardText>
                <Line
                  data={{
                    /* Graph showing the development of weight measurement */
                    labels: this.state.measurements.map(
                      (measurement) => measurement.date
                    ),
                    datasets: [
                      {
                        label: "Weight (kg)",
                        data: this.state.measurements.map(
                          (measurement) => measurement.weight
                        ),
                        borderColor: "#198722",
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
              <MDBCardBody className="text-center">
                <MDBCardText className="mb-1">Workout stats</MDBCardText>
                <Bar
                  data={{
                    /* Graph showing the stats of workouts */
                    labels: [
                      "All workouts",
                      "Workouts done",
                      "Workouts missed",
                      "Workouts this month",
                    ],
                    datasets: [
                      {
                        label: "Count",
                        data: [
                          this.state.workouts.workouts_count,
                          this.state.workouts.workouts_count -
                            this.state.workouts.workouts_absent_count,
                          this.state.workouts.workouts_absent_count,
                          this.state.workouts.workouts_three_months_count,
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
              <MDBCardBody className="text-center">
                <MDBCardText className="mb-1">
                  Workout counts by type of workout
                </MDBCardText>
                <Bar
                  data={{
                    /* Graph showing the stats about type of workouts */
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

export default Stats;
