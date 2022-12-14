/* Author: Vasil Poposki,  xpopos00*/

import React, { Component } from "react";
import { Table, Container, Modal, ModalBody, ModalHeader } from "reactstrap";
import { FaTimes, FaUndo } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";

import WorkoutExercisesList from "./WorkoutExercisesList.js";
import WorkoutPopover from "./WorkoutPopover.js";

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

  var d = datetimeString.substr(8, 2);
  var m = datetimeString.substr(5, 2);
  var y = datetimeString.substr(0, 4);

  return title + d + ". " + m + ". " + y;
}

class WorkoutsSummaryList extends Component {
  /* Workout list component. Renders the table of workouts provided in props. */
  toggleExercises = this.toggleExercises.bind(this);
  state = {
    exercisesModal: false,
    exercisesModalWorkoutId: 0,
    popoverOpen: false,
  };
  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }
  toggleExercises(workoutId) {
    const newWorkoutId = this.state.exercisesModal === false ? workoutId : 0;
    this.setState({
      exercisesModal: !this.state.exercisesModal,
      exercisesModalWorkoutId: newWorkoutId,
    });
  }
  isOpenExercisesModal(workoutId) {
    return workoutId === this.state.exercisesModalWorkoutId;
  }

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
              <th>
                {this.props.isTrainer == "true" ? "Client absent" : "Absent"}
              </th>
              <th></th>
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
                  <td>{workout.client_full_name}</td>
                  <td>{workout.type}</td>
                  <td>{getTime(workout.time)}</td>
                  <td>{workout.duration ? workout.duration + " min" : "-"}</td>
                  <td align="center">
                    <BiDetail
                      className="detail-icon"
                      onClick={() => this.toggleExercises(workout.pk)}
                    />
                    &nbsp;&nbsp;
                  </td>
                  <td id="td-client-came" align="center">
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
                  {this.props.isTrainer == "true" && (
                    <td>
                      <BsThreeDots
                        id={"Popover-" + workout.pk}
                        style={{ fontSize: "30px" }}
                        onClick={this.togglePopover}
                      />
                      <WorkoutPopover
                        key={workout.pk}
                        id={workout.pk}
                        workout={workout}
                      />
                    </td>
                  )}
                  <Modal
                    style={{ maxWidth: "700px", width: "100%" }}
                    isOpen={this.isOpenExercisesModal(workout.pk)}
                    toggle={this.toggleExercises}
                  >
                    <ModalHeader>Exercises</ModalHeader>
                    <ModalBody>
                      <WorkoutExercisesList
                        toggle={this.toggleExercises}
                        exercises={workout.exercises}
                      />
                    </ModalBody>
                  </Modal>
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
