/* Author: Vasil Poposki,  xpopos00*/

import { Component } from "react";
import { Table } from "reactstrap";

class WorkoutExercisesList extends Component {
  /* Workout exercises table component. Contains information about exercises of the specific workout.*/
  render() {
    return (
      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Number of sets</th>
            <th>Number of reps</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.props.exercises.map((exercise, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{exercise.name}</td>
              <td>{exercise.num_of_sets}</td>
              <td>{exercise.num_of_reps}</td>
              <td>{exercise.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default WorkoutExercisesList;
