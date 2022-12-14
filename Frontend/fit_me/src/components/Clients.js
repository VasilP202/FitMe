/*Author: Michal Polonec, xpolon02 */

import { Component } from "react";
import { Table, Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";
import { Container } from "reactstrap";
import StatsModal from "./StatsModal";
import NewClientForm from "./NewClientForm";

class Clients extends Component {
  /* Clients component. Renders the table of all clients for the trainer. */
  state = {
    clients: [],
    statsModal: false,
    statsModalClientId: 0,
    editModal: false,
    editID: 0,
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
    axios.delete(API_URL + "clients/" + clientId + "/");
    window.location.reload(false);
  };

  Edit(clientId) {
    return clientId === this.state.editID;
  }

  toggleUpdateClient = this.toggleUpdateClient.bind(this);
  toggleUpdateClient(clientId) {
    const newClientId = this.state.editModal === false ? clientId : 0;

    this.setState({
      editModal: !this.state.editModal,
      editID: newClientId,
    });
  }

  updateClient = (clientId) => {
    axios.put(API_URL + "clients/" + clientId + "/");
  };

  render() {
    return (
      <Container style={{ marginTop: "100px" }}>
        <h2>My clients</h2>
        <Table hover className="Table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Sex</th>
              <th>Birth Date</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Client Stats</th>
              <th>Update client</th>
              <th>Delete client</th>
            </tr>
          </thead>
          <tbody>
            {this.state.clients.map((client) => (
              <tr>
                <td>
                  {client.first_name} {client.last_name}
                </td>
                <td>{client.sex}</td>
                <td>{client.birth_date}</td>
                <td>{client.phone}</td>
                <td>{client.email}</td>
                <td>
                  <Button color="info" onClick={() => this.toggle(client.pk)}>
                    Stats
                  </Button>
                  <Modal
                    style={{ maxWidth: "700px", width: "100%" }}
                    isOpen={this.isOpen(client.pk)}
                    toggle={this.toggle}
                  >
                    <ModalHeader toggle={this.toggle}>
                      Statistic of client
                    </ModalHeader>
                    <ModalBody>
                      <StatsModal toggle={this.toggle} clientId={client.pk} />
                    </ModalBody>
                  </Modal>
                </td>
                <td>
                  <Button
                    color="secondary"
                    onClick={() => this.toggleUpdateClient(client.pk)}
                  >
                    Update
                  </Button>
                  <Modal
                    isOpen={this.Edit(client.pk)}
                    toggle={this.toggleUpdateClient}
                  >
                    <ModalHeader toggle={this.toggleUpdateClient}>
                      Edit Client
                    </ModalHeader>
                    <ModalBody>
                      <NewClientForm
                        toggle={this.toggleUpdateClient}
                        client={client}
                      />
                    </ModalBody>
                  </Modal>
                </td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this client?"
                        )
                      )
                        this.deleteClient(client.pk);
                    }}
                  >
                    {" "}
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}
export default Clients;
