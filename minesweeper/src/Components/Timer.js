import React, { PureComponent } from "react";
import { Button, Alert, Badge } from "react-bootstrap";

export default class Timer extends PureComponent {
  state = {
    startTime: null,
    endTime: null,
    counter: 0,
    started: false,
    ended: false
  };

  componentDidMount() {
    setInterval(() => {
      if (this.props.restart) {
        this.setState({ counter: 0 });
      }
      if (this.props.start && !this.props.end) {
        this.setState({ counter: this.state.counter + 1 });
      }
    }, 1000);
  }

  render() {
    return (
      <div>
        <h3 className="margin">
          <Badge>Timer</Badge>
          <Alert variant="secondary">{this.state.counter}</Alert>
        </h3>
      </div>
    );
  }
}
