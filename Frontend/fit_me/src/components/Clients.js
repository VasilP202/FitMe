import { Component } from "react";
import { Col, Row, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";
import { Container } from "reactstrap";
import Stats from "./Stats";

class Clients extends Component {
  state = {
    clients: [],
    statsModal: false,
    statsModalClientId: 0,
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

  toggle = this.toggle.bind(this);

  toggle(clientId) {
    const newClientId = this.state.statsModal === false ? clientId : 0;

    this.setState({
      statsModal: !this.state.statsModal,
      statsModalClientId: newClientId,
    });
  }
  isOpen(clientId) {
    return clientId === this.state.statsModalClientId;
  }

  deleteClient = (clientId) => {
    // TODO Potvrdit smazani
    axios
      .delete(API_URL + "clients/" + clientId + "/")
      .then(() => console.log("Deleted"));
  };
  updateClient = (clientId) => {
    //axios.put()
  };

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
              <button onClick={() => this.toggle(client.pk)}>Stats</button>
              <Modal
                style={{ maxWidth: "700px", width: "100%" }}
                isOpen={this.isOpen(client.pk)}
                toggle={this.toggle}
              >
                <ModalHeader toggle={this.toggle}>
                  Schedule new training session with your client
                </ModalHeader>
                <ModalBody>
                  <Stats toggle={this.toggle} clientId={client.pk} />
                </ModalBody>
              </Modal>
              {/* TODO Stats - Statistika klienta Stats.js */}
            </div>
          ))}
        </div>
      </Container>
    );
  }
}
export default Clients;
