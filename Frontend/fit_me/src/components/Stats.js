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
} from "mdb-react-ui-kit";
import "../App.css";
import "../Stats.css";
import axios from "axios";
import { API_URL } from "../constants";

class Stats extends Component {
  state = {
    personalInfo: {},
  };

  componentDidMount() {
    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;
    axios
      .get(API_URL + "clients/personal-info/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => this.setState({ personalInfo: response.data }));
  }

  render() {
    return (
      <section
        style={{ backgroundColor: "#fff", position: "relative", top: "100px" }}
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
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">
                    Message
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCol md="6">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full name</MDBCardText>
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
                      <MDBCardText className="text-muted"></MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted"></MDBCardText>
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
                  <MDBCardText className="mb-1" style={{ fontSize: "0.9rem" }}>
                    Successful trainings
                  </MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar
                      bgColor="success"
                      width={80}
                      valuemin={0}
                      valuemax={100}
                    >
                      80
                    </MDBProgressBar>
                  </MDBProgress>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}

export default Stats;
