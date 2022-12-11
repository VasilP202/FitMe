import { Component } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { Container } from "reactstrap";

class Clients extends Component {
  state = {
    clients: [],
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
      .then((response) => this.setState({ clients: response.data }));
  }

  deleteClient = (clientId) => {
    // TODO Potvrdit smazani
    axios
      .delete(API_URL + "clients/" + clientId + "/")
      .then(() => console.log("Deleted"));
  };
  updateClient = (clientId) => {
    //axios.put()
  }

  render() {
    return (
      <Container style={{ marginTop: "100px" }}>
        <h2>My clients</h2>
        {/* TODO - Tabulka (jako WorkoutSummaryList ) */}
        <div>
          {this.state.clients.map((client) => (
            <div>
              <p>{client.first_name + " " + client.last_name} </p>
              <button onClick={() => this.deleteClient(client.pk)}>
                Delete
              </button>
              {/* TODO Stats - Statistika klienta Stats.js */}
            </div>
          ))}
        </div>
      </Container>
    );
  }
}
export default Clients;
