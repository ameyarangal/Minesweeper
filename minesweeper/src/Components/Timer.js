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

  interval = null;

  componentDidUpdate(prevProps) {
    if (
      prevProps.start !== this.props.start ||
      prevProps.end !== this.props.end ||
      prevProps.restart !== this.props.restart
    ) {
      if (this.props.start) {
        this.interval = setInterval(() => {
          this.setState({ counter: this.state.counter + 1 });
        }, 1000);
      } else if (this.props.end) {
        if (this.interval) {
          clearInterval(this.interval);
        }
        this.props.onTimerEnd(this.state.counter);
      } else if (this.props.restart) {
        if (this.interval) {
          clearInterval(this.interval);
        }
        this.setState({ counter: 0 });
      }
    }
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
