import { Component } from "react";
import { API_URL, AUTH_URL } from "../constants";
import axios from "axios";

class TrainerStats extends Component {
  state = {
    trainerInfo: {},
    stats: {},
  };

  componentDidMount() {
    const tokenString = localStorage.getItem("token");
    const accessToken = JSON.parse(tokenString)?.access;

    axios
      .get(AUTH_URL + "trainer-personal-info/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        this.setState({ trainerInfo: response.data });
      });

    axios
      .get(API_URL + "workouts/trainer-stats/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        this.setState({ stats: response.data });
      });
  }

  render() {
    console.log(this.state);
    return "trainer stats";
  }
}

export default TrainerStats;
