import React, { Component } from "react";
import { Table, Form, FormGroup, Input, Label, Container } from "reactstrap";
import "../App.css";
import { FaTimes, FaUndo } from "react-icons/fa";

function getTime(datetime) {
  return datetime.substr(11, 5);
}

function getDateTitle(datetime) {
  var title;
  var today = new Date();

  var datetimeCopy = new Date(datetime);
  datetimeCopy.setMinutes(datetime.getMinutes() + 60);

  var datetimeString = datetimeCopy.toISOString();

  if (today.toISOString().substr(0, 10) === datetimeString.substr(0, 10))
    title = "Daily Summary: ";
  else if (today.getTime() < datetimeCopy.getTime())
    title = "Scheduled Workouts: ";
  else if (today.getTime() > datetimeCopy.getTime())
    title = "Completed Workouts: ";

  /* const timezoneOffset = new Date().getTimezoneOffset();
  console.log(timezoneOffset); */

  var d = datetimeString.substr(8, 2);
  var m = datetimeString.substr(5, 2);
  var y = datetimeString.substr(0, 4);

  return title + d + ". " + m + ". " + y;
}

class WorkoutsSummaryList extends Component {
  render() {
    return (
      <Container id="summary">
        <h4>{getDateTitle(this.props.datetime)}</h4>
        <Table hover className="Table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Training type</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Detail</th>
              <th>Client absent</th>
            </tr>
          </thead>
          <tbody>
            {!this.props.workouts || this.props.workouts.length <= 0 ? (
              <tr>
                <td colSpan="6" align="center">
                  <b>No workouts for the selected date.</b>
                </td>
              </tr>
            ) : (
              this.props.workouts.map((workout) => (
                <tr
                  key={workout.pk}
                  className={`workout ${workout.done ? "workout-done" : ""} ${
                    !workout.client_came && workout.client_came != null
                      ? "workout-no-client"
                      : ""
                  }`}
                  onDoubleClick={() => this.props.onToggleWorkoutDone(workout)}
                >
                  {" "}
                  {/* TODO hyperlink to client - workout.client returns client PK */}
                  {/* TODO table with <Row> <Col> */}
                  <td>{workout.client_full_name}</td>
                  <td>{workout.type}</td>
                  <td>{getTime(workout.time)}</td>
                  <td>{workout.duration ? workout.duration + "min" : "-"}</td>
                  <td>{workout.description || "-"}</td>
                  <td id="td-client-came">
                    {workout.client_came === null || workout.client_came ? (
                      <FaTimes
                        className="fa-icon"
                        onClick={() => this.props.onToggleClientCame(workout)}
                      />
                    ) : (
                      <FaUndo
                        className="fa-icon"
                        id="fa-icon-undo"
                        onClick={() => this.props.onToggleClientCame(workout)}
                      />
                    )}
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
