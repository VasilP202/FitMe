import React, { Component } from "react";
import { Col, Row, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { MdOutlineAddCircle } from "react-icons/md";
import NewMeasurement from "./NewMeasurement";
import NewPicture from "./NewPicture";

class ClientForms extends Component {
  state = {
    modal: false,
    modal2: false,
  };

  toggle = this.toggle.bind(this);
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggle2 = this.toggle2.bind(this);
  toggle2() {
    this.setState({
      modal2: !this.state.modal2,
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
              onClick={this.toggle2}
            />
            <p>New progress photos</p>
          </div>
        <Modal isOpen={this.state.modal2} toggle2={this.toggle2}>
            <ModalHeader toggle2={this.toggle2}>
              Add new picture
            </ModalHeader>
            <ModalBody>
              <NewPicture toggle2={this.toggle2} />
            </ModalBody>
          </Modal>
          </Col>
      </Row>
    );
  }
}
export default ClientForms;
