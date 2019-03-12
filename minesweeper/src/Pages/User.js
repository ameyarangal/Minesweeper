import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Table, Form, Col } from "react-bootstrap";
import "./User.css";
import { getApi } from "../Common/Api";
import { stat } from "fs";

class User extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userdetails: [],
      difficultyLevel: "All"
    };
  }

  onGetSuccess = data => {
    console.log("data in get history");
    console.log(data);
    this.setState({ userdetails: data });
  };

  onGetFailure = err => {
    console.log(`error in get userdetails ${err}`);
  };

  componentDidMount() {
    getApi(
      `/history/getByUserId/${this.props.userId}`,
      this.onGetSuccess,
      this.onGetFailure
    );
  }

  filterDetails = value => {
    if (this.state.difficultyLevel === "All") {
      return true;
    } else {
      return value.Difficulty === this.state.difficultyLevel;
    }
  };

  onDifficultyLevelChange = event => {
    console.log(event.target.value);
    this.setState({ difficultyLevel: event.target.value });
  };

  render() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/login");
      return null;
    } else {
      return (
        <div>
          <Form>
            <Form.Row>
              <Col>
                <Form.Group
                  controlId="formControlsSelect"
                  className="userDifficulty"
                >
                  <Form.Label>Difficulty</Form.Label>
                  <Form.Control
                    onChange={event => this.onDifficultyLevelChange(event)}
                    as="select"
                    placeholder="select"
                  >
                    <option value="All">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Expert">Expert</option>
                    <option value="Custom">Custom</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
          </Form>
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Time</th>
                <th>Status</th>
                <th>Difficulty</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userdetails
                .filter(detail => this.filterDetails(detail))
                .map((userdetail, i) => {
                  return (
                    <tr>
                      <th>{i + 1}</th>
                      <th>{userdetail.Score}</th>
                      <th>{userdetail.Status}</th>
                      <th>{userdetail.Difficulty}</th>
                      <th>{userdetail.Date}</th>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  userId: state.user.Id
});

export default connect(mapStateToProps)(User);
