import React, { PureComponent } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const difficultyLevel = [
  { Name: "Easy", Rows: 8, Cols: 8, Mines: 10 },
  { Name: "Medium", Rows: 16, Cols: 16, Mines: 40 },
  { Name: "Expert", Rows: 16, Cols: 30, Mines: 99 },
  { Name: "Custom", Rows: "", Cols: "", Mines: "" }
];

export default class NewGameModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      difficulty: "",
      rows: 0,
      cols: 0,
      mines: 0,
      showCustom: false,
      selectValue: ""
    };
  }

  handleChange = (e, data) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectChange = (e, data) => {
    console.log(data);
    if (data.Name !== "Custom") {
      this.setState({
        rows: data.Rows,
        cols: data.Cols,
        mines: data.Mines,
        showCustom: false,
        difficulty: data.Name
      });
    } else {
      this.setState({ showCustom: true, difficulty: "Custom" });
    }
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={() => this.props.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>New Game Configuration</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} md="6">
                    <Form.Label> Difficulty Level</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md="2">
                    <Form.Label>Rows</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md="2">
                    <Form.Label>Cols</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md="2">
                    <Form.Label>Mines</Form.Label>
                  </Form.Group>
                </Form.Row>

                {difficultyLevel.map((d, i) => {
                  if (d.Name !== "Custom") {
                    return (
                      <Form.Row key={"formRow" + i}>
                        <Form.Group as={Col} md="6">
                          <Form.Check
                            type="radio"
                            label={d.Name}
                            name="Radios"
                            id={i + 1}
                            onChange={e => this.selectChange(e, d)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                          <Form.Label>{d.Rows}</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                          <Form.Label>{d.Cols}</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                          <Form.Label>{d.Mines}</Form.Label>
                        </Form.Group>
                      </Form.Row>
                    );
                  } else {
                    return (
                      <Form.Row key={"formRow" + i}>
                        <Form.Group as={Col} md="6">
                          <Form.Check
                            type="radio"
                            label={d.Name}
                            name="Radios"
                            id={i + 1}
                            onChange={e => this.selectChange(e, d)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                          <Form.Control
                            type="text"
                            name="rows"
                            disabled={!this.state.showCustom}
                            onChange={e => this.handleChange(e, d)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                          <Form.Control
                            type="text"
                            disabled={!this.state.showCustom}
                            name="cols"
                            onChange={e => this.handleChange(e, d)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                          <Form.Control
                            type="text"
                            name="mines"
                            disabled={!this.state.showCustom}
                            onChange={e => this.handleChange(e, d)}
                          />
                        </Form.Group>
                      </Form.Row>
                    );
                  }
                })}
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.props.handleClose()}
            >
              Close
            </Button>
            <Button
              variant="dark"
              onClick={() =>
                this.props.handleOk(
                  this.state.rows,
                  this.state.cols,
                  this.state.mines,
                  this.state.difficulty
                )
              }
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
