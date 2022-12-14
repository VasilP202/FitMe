import { Component } from "react";
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";
import NewWorkoutForm from "./NewWorkoutForm";

class WorkoutPopover extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleWorkoutForm = this.toggleWorkoutForm.bind(this);

    this.state = {
      popoverOpen: false,
      modalWorkoutForm: false,
      workout: {},
    };
  }

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
