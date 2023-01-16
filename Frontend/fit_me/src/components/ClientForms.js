/* Author: Vasil Poposki,  xpopos00*/

import React, { Component } from "react";
import { Col, Row, Modal, ModalHeader, ModalBody } from "reactstrap";
import { MdOutlineAddCircle } from "react-icons/md";
import NewMeasurement from "./NewMeasurement";

class ClientForms extends Component {
  /* Client forms section component. Provides client form modals. */
  state = {
    modal: false,
  };

  toggle = this.toggle.bind(this);
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <Row id="forms-row">
        <Col xs="4" sm="4">
          <div className="form-add-inline">
            <MdOutlineAddCircle
              className="form-add-icon"
              onClick={this.toggle}
            />
            <p>New measurement</p>
          </div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              Add new weight measurement
            </ModalHeader>
            <ModalBody>
              <NewMeasurement toggle={this.toggle} />
            </ModalBody>
          </Modal>
        </Col>
      </Row>
    );
  }
}
export default ClientForms;
