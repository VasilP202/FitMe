import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { MdOutlineAddCircle } from "react-icons/md";

class ClientForms extends Component {
  render() {
    return (
      <Row id="forms-row" /* className="justify-content-md-center" */>
        <Col xs="4" sm="4">
          <div className="form-add-inline">
            <MdOutlineAddCircle
              className="form-add-icon" /*  onClick={this.} */
            />
            <p>New measurement</p>
          </div>
        </Col>
        <Col xs="4" sm="4">
          <div className="form-add-inline">
            <MdOutlineAddCircle
              className="form-add-icon" /* onClick={this.}  */
            />
            <p>New progress photos</p>
          </div>
        </Col>
      </Row>
    );
  }
}
export default ClientForms;
