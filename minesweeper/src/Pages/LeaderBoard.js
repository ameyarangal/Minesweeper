import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Table, Form, Col } from "react-bootstrap";
import "./LeaderBoard.css";
import { getApi } from "../Common/Api";

class LeaderBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leaderBoardDetails: [],
      difficultyLevel: "Easy"
    };
  }

  onGetSuccess = data => {
    console.log("data in get leader baord");
    console.log(data);
    this.setState({ leaderBoardDetails: data });
  };

  onGetFailure = err => {
    console.log(`error in get leader board ${err}`);
  };

  componentDidMount() {
    getApi(
      "http://localhost:3010/history/getLeaderBoard",
      this.onGetSuccess,
      this.onGetFailure
    );
  }

  // filterDetails = value => {
  //   if (this.state.difficultyLevel === "All") {
  //     return true;
  //   } else {
  //     return value.Difficulty === this.state.difficultyLevel;
  //   }
  // };

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
                    inline
                    onChange={event => this.onDifficultyLevelChange(event)}
                    as="select"
                    placeholder="select"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Expert">Expert</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
          </Form>
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
                <th>Difficulty</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.leaderBoardDetails
                .filter(
                  detail => detail.Difficulty === this.state.difficultyLevel
                )
                .map((leader, i) => {
                  return (
                    <tr>
                      <th>{i + 1}</th>
                      <th>{`${leader.FirstName} ${leader.LastName}`}</th>
                      <th>{leader.Score}</th>
                      <th>{leader.Difficulty}</th>
                      <th>{leader.Date}</th>
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
  isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(LeaderBoard);
