import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
export default class CounterInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value:
        this.props.value < this.props.min
          ? this.props.min
          : this.props.value || 0,
      min: this.props.min || 0,
      max: this.props.max || -1,
    };
  }

  set = (value) => {
    this.setState({
      value,
    });
    this.props.onChange(value);
  };

  _onChange = (e) => {
    let new_value = e.target.value;

    // check for empty string or invalid values
    if (new_value === "") {
      this.set(this.state.min); // fallback to min value
    } else if (
      (new_value > this.state.max && this.state.max !== -1) ||
      new_value < this.state.min
    ) {
      return; // don't update the value
    } else if (typeof new_value != "number") {
      var parsed = parseInt(new_value, 10); // try to parse the number

      // if parsed is not a number
      if (isNaN(parsed)) {
        this.set(this.state.min); // fallback to min value
      } else {
        // if parsed succesfully update the value
        this.set(parsed);
      }
    }
  };

  _increase = (value) => {
    if (value === "") {
      this.set(this.state.min); // fallback to min value
    } else {
      let parsed = parseInt(value, 10);

      // if parsed is not a number
      if (isNaN(parsed)) {
        this.set(this.state.min); // fallback to min value
      } else {
        if (value < this.state.max || this.state.max == -1) {
          this.set(parsed + 1); // increment value
        }
      }
    }
  };

  _decrease = (value) => {
    if (value === "") {
      this.set(this.state.min); // fallback to min value
    } else {
      let parsed = parseInt(value, 10);

      // if parsed is not a number
      if (isNaN(parsed)) {
        this.set(this.state.min); // fallback to min value
      } else {
        if (value > this.state.min) {
          this.set(parsed - 1); // increment value
        }
      }
    }
  };

  render() {
    const { value } = this.state;

    return (
      <div className="d-flex align-items-end">
        <Button
          onClick={() => {
            this._increase(value);
          }}
          variant="primary"
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <input
          className="form-control ms-2 me-2"
          type="text"
          onChange={this._onChange}
          value={value}
        />
        <Button
          className=""
          onClick={() => {
            this._decrease(value);
          }}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      </div>
    );
  }
}
