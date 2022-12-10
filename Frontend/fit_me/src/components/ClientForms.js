import React, { Component } from "react";
import { Col, Row, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { MdOutlineAddCircle } from "react-icons/md";
import NewMeasurement from "./NewMeasurement";

class ClientForms extends Component {
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
      <Row id="forms-row" /* className="justify-content-md-center" */>
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
        <Col xs="4" sm="4">
          <div className="form-add-inline">
            <MdOutlineAddCircle
              className="form-add-icon"
              onClick={this.toggle}
            />
            <p>New progress photos</p>
          </div>
        </Col>
      </Row>
    );
  }
}
export default ClientForms;
