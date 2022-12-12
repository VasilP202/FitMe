import React, { Component } from "react";
import { Col, Row, Modal, ModalHeader, ModalBody } from "reactstrap";
import { MdOutlineAddCircle } from "react-icons/md";
import NewWorkoutForm from "./NewWorkoutForm";
import NewClientForm from "./NewClientForm";

class TrainerForms extends Component {
  state = {
    modalWorkoutForm: false,
    modalClientForm: false,
  };

  toggleWorkoutForm = this.toggleWorkoutForm.bind(this);
  toggleClientForm = this.toggleClientForm.bind(this);

  toggleWorkoutForm() {
    this.setState({
      modalWorkoutForm: !this.state.modalWorkoutForm,
    });
  }

  toggleClientForm() {
    this.setState({
      modalClientForm: !this.state.modalClientForm,
    });
  }

  render() {
    return (
      <Row id="forms-row">
        <Col xs="4" sm="4">
          <div className="form-add-inline">
            <MdOutlineAddCircle
              className="form-add-icon"
              onClick={this.toggleWorkoutForm}
            />
            <p>New workout</p>
          </div>
          <Modal isOpen={this.state.modalWorkoutForm} toggle={this.toggleWorkoutForm}>
            <ModalHeader toggle={this.toggleWorkoutForm}>
              Schedule new training session with your client
            </ModalHeader>
            <ModalBody>
              <NewWorkoutForm toggle={this.toggleWorkoutForm} />
            </ModalBody>
          </Modal>
        </Col>
        <Col xs="4" sm="4">
          <div className="form-add-inline">
            <MdOutlineAddCircle
              className="form-add-icon"
              onClick={this.toggleClientForm}
            />
            <p>New client</p>
          </div>
          <Modal isOpen={this.state.modalClientForm} toggle={this.toggleClientForm}>
            <ModalHeader toggle={this.toggleClientForm}>Add new client</ModalHeader>
            <ModalBody>
              <NewClientForm toggle={this.toggleClientForm} />
            </ModalBody>
          </Modal>
        </Col>
      </Row>
    );
  }
}
export default TrainerForms;
