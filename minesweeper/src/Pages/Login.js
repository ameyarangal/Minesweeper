import React, { PureComponent } from "react";
import { Button, Form, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import validator from "validator";
import { login } from "../Actions/UserActions";
import { connect } from "react-redux";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: ""
    };
  }

  validateForm() {
    return this.state.Username.length > 0 && this.state.Password.length > 0;
  }

  onhandleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.login(
      this.state.Username,
      this.state.Password,
      this.onSuccessfulLogin
    );
  };

  onSuccessfulLogin = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="Username" bssize="large">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.Username}
              onChange={this.onhandleChange}
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
            Login
          </Button>
          {this.props.loginMessage && <div>{this.props.loginMessage}</div>}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  loginMessage: state.user.loginMessage
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
