import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class ConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show
    };
  }

  handleClose = () => {
    console.log(`handle closed called`);
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={() => this.props.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.children}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.props.handleClose()}
            >
              Close
            </Button>
            <Button variant="primary" onClick={() => this.props.handleOk()}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
