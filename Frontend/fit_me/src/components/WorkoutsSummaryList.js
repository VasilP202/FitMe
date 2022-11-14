import React, { Component } from "react";
import { Table, Form, FormGroup, Input, Label, Container } from "reactstrap";
import "../App.css";

function getTime(datetime) {
  return datetime.substr(11, 5);
}

function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  
  return mm + '.' + dd + '.' + yyyy;
}

class WorkoutsSummaryList extends Component {
  render() {
    return (
      <Container id="summary">
        <h4>Daily Summary - {getDate()}</h4>
        <Table hover className="Table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Training type</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Detail</th>
              <th>Client came</th>
            </tr>
          </thead>
          <tbody>
            {!this.props.workouts || this.props.workouts.length <= 0 ? (
              <tr>
                <td colSpan="6" align="center">
                  {" "}
                  {/* TODO this.props.workout for next day */}
                  <b>Ops, no one here yet</b>
                </td>
              </tr>
            ) : (
              this.props.workouts.map((workout) => (
                <tr
                  key={workout.pk}
                  className={`workout ${workout.done ? "workout-done" : ""}`}
                  onDoubleClick={() => this.props.onToggle(workout)}
                >
                  {" "}
                  {/* TODO hyperlink to client - workout.client returns client PK */}
                  {/* TODO table with <Row> <Col> */}
                  <td>{workout.client_full_name}</td>
                  <td>{workout.type}</td>
                  <td>{getTime(workout.time)}</td>
                  <td>{workout.duration ? workout.duration + "min" : "-"}</td>
                  <td>{workout.description || "-"}</td>
                  <td>
                    <Form>
                      <FormGroup check>
                        <Input id="checkbox2" type="checkbox" />{" "}
                        <Label check></Label>
                      </FormGroup>
                    </Form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default WorkoutsSummaryList;
