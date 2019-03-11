import React, { PureComponent } from "react";
import "./Register.css";
import { register } from "../Actions/UserActions";
import { connect } from "react-redux";
import { Button, Form, FormControl, ControlLabel } from "react-bootstrap";

class Register extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      Username: "",
      Password: ""
    };
  }

  validateForm() {
    return (
      this.state.Username.length > 0 &&
      this.state.Password.length > 0 &&
      this.state.FirstName.length > 0 &&
      this.state.Password.length > 0
    );
  }

  onhandleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSuccessfulRegister = () => {
    this.props.history.push("/login");
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.register(
      this.state.FirstName,
      this.state.LastName,
      this.state.Username,
      this.state.Password,
      this.onSuccessfulRegister
    );
  };

  render() {
    return (
      <div className="Register">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="FirstName" bssize="large">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.FirstName}
              onChange={this.onhandleChange}
            />
          </Form.Group>
          <Form.Group controlId="LastName" bssize="large">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={this.state.LastName}
              onChange={this.onhandleChange}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="Username" bssize="large">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              value={this.state.Username}
              onChange={this.onhandleChange}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="Password" bssize="large">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={this.state.Password}
              onChange={this.onhandleChange}
              type="password"
            />
          </Form.Group>
          <Button
            block
            variant="dark"
            bssize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Register
          </Button>
          {this.props.loginMessage && <div>{this.props.loginMessage}</div>}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { register }
)(Register);
