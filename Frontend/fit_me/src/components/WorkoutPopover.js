/* Author: Vasil Poposki,  xpopos00*/

import { Component } from "react";
import { Button, Popover, PopoverBody } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

class WorkoutPopover extends Component {
  /* Single workout popover component. Provides delete workout option. */
  toggle = this.toggle.bind(this);
  toggleWorkoutForm = this.toggleWorkoutForm.bind(this);
  state = {
    popoverOpen: false,
    modalWorkoutForm: false,
    workout: {},
  };

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  toggleWorkoutForm() {
    this.setState({
      modalWorkoutForm: !this.state.modalWorkoutForm,
    });
  }

  deleteWorkout = () => {
    const workoutId = this.props.id;
    axios.delete(API_URL + "workouts/" + workoutId + "/");
    window.location.reload(false);
  };
  render() {
    return (
      <span>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target={"Popover-" + this.props.id}
          toggle={this.toggle}
        >
          <PopoverBody>
            <Button color="danger" onClick={this.deleteWorkout}>
              Delete
            </Button>
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}
export default WorkoutPopover;
