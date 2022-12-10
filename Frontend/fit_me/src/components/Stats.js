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
import { Line } from 'react-chartjs-2';
import { Chart as chartjs } from "chart.js/auto";


class Stats extends Component {
  getMeasurements() {
    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .get(API_URL + "clients/measurement-list/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => console.log(response.data));
  }
    render() {
    let forms;
    const isTrainer = localStorage.getItem("is_trainer");
    if (isTrainer === "false") forms = <ClientForms />;
    return (
      <section style={{ backgroundColor: '#fff',position: 'relative',top: '80px' }}>
      <MDBContainer className="py-5">
        <div style={{ backgroundColor: '#fff',position: 'relative',top: '-25px' }}>{forms}</div>
        <MDBRow>       
          <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">User name</p>
              </MDBCardBody>
            </MDBCard>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted"></MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted" />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{localStorage.getItem("email")}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-2">Stats</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '0.9rem' }}>Successful trainings</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar bgColor='success' width={80} valuemin={0} valuemax={100}>
                          80 
                      </MDBProgressBar>                      
                    </MDBProgress>
                  </MDBCardBody>
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4.webp"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid />
                      <p className="text-muted mb-1">Trainer name</p>
                    </MDBCardBody>
                </MDBCard>
              </MDBCol>

              </MDBRow>
              <MDBRow>

              <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
              <MDBCardText className="mb-1"> Weight progress</MDBCardText>
              <Line data={{
                        labels:[2016, 2018, 2020],
                        datasets: [{
                          label: "Weight",
                          data: [80, 20, 100],
                          borderColor: '#198722',
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
