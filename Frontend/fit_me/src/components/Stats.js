import React, { Component } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
} from 'mdb-react-ui-kit';
import "../App.css";
import "../Stats.css";
import ClientForms from "./ClientForms";
import axios from "axios";
import { API_URL } from "../constants";
import { Line, Bar } from 'react-chartjs-2';
import { Chart as chartjs } from "chart.js/auto";


class Stats extends Component {
  state = {
    measurements: [],
    workouts: [],
    personalInfo: {},
  };

  componentDidMount() {
    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    
    let params = {};
    if (this.props.clientId) {
      params["id"] = this.props.clientId;
    }

    axios
      .get(API_URL + "clients/measurement-list/", {
        params: params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        this.setState({ measurements: response.data });
      });

      axios
      .get(API_URL + "clients/workout-stats/", {
        params: params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        this.setState({ workouts: response.data });
      });

      axios
      .get(API_URL + "clients/personal-info/", {
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
    const trainer = this.state.personalInfo.trainer;
    const arr = this.state.workouts.workouts_by_type_count;
    if (arr) {
      arr.forEach(wType => {
        console.log(wType.type, wType.count)
      });
    }
    let whoIS;
    const isTrainer = localStorage.getItem("is_trainer");
    if (isTrainer === "false") {
      whoIS = "CLIENT";
    }
    else {
      whoIS = "TRAINER";
    }
    return (
      <section style={{ backgroundColor: '#fff',position: 'relative',top: '80px' }}>
      <MDBContainer className="py-5">
        <MDBRow>       
          <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">{ whoIS }</p>
                <p className="text-muted mb-1">{ localStorage.getItem("username")}</p>
              </MDBCardBody>
            </MDBCard>
            </MDBRow>
            <MDBRow>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Name:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{this.state.personalInfo.first_name + " " + this.state.personalInfo.last_name}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{this.state.personalInfo.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{this.state.personalInfo.phone}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Birth:</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{this.state.personalInfo.birth_date}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody className="text-center">
                    <MDBCardText className="mb-1">My trainer</MDBCardText>
                      <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4.webp"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid />
                      <p className="text-muted mb-1">{trainer?.first_name + " " + trainer?.last_name}</p>
                      <p className="text-muted mb-1">{trainer?.email}</p>
                    </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                <MDBCardText className="mb-1">Weight progress</MDBCardText>
                <Line data={{
                          labels: this.state.measurements.map((measurement) => (measurement.date)),
                          datasets: [{
                            label: "Weight (kg)",
                            data: this.state.measurements.map((measurement) => (measurement.weight)),
                            borderColor: '#198722',
                          }],
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
                <Bar data={{
                          labels: ["All workouts", "Workouts done", "Workouts missed", "Workouts this month"],
                          datasets: [{
                            label: "Count",
                            data: [this.state.workouts.workouts_count, this.state.workouts.workouts_count-this.state.workouts.workouts_absent_count,this.state.workouts.workouts_absent_count, this.state.workouts.workouts_three_months_count],
                            backgroundColor: ['#bababa', '#198722', '#f44336', '#ffd966'],
                          }],
                        }}
                        />
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                <MDBCardText className="mb-1">Workout counts by type of workout</MDBCardText>
                <Bar data={{
                          labels: arr?.map((types) => (types.type)),
                          datasets: [{
                            label: "Count",
                            data: arr?.map((counts) => (counts.count)),
                            backgroundColor: [ '#8022D4' ,'#22ABD4', '#22D49B', '#32D422', '#B1D422', '#D49922', '#D43D22',  ],
                          }],
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
