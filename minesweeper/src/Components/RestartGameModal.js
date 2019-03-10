import React, { PureComponent } from "react";
import ConfirmationModal from "./ ConfirmationModal";

export default class RestartGameModal extends PureComponent {
  render() {
    return (
      <div>
        <ConfirmationModal
          title={`GAME LOST`}
          handleOk={() => this.props.handleOk()}
          show={this.props.show}
          handleClose={() => {
            this.props.handleClose();
          }}
        >
          <div>Do you want to play again ?</div>
        </ConfirmationModal>
      </div>
    );
  }
}
