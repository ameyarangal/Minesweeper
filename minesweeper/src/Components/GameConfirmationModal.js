import React, { PureComponent } from "react";
import ConfirmationModal from "./ ConfirmationModal";

export default class GameConfirmationModal extends PureComponent {
  render() {
    switch (this.props.gameStatus) {
      case "Playing":
        return (
          <div>
            <ConfirmationModal
              title={`Game Incomplete`}
              handleOk={() => this.props.handleClose()}
              show={this.props.show}
              handleClose={() => {
                this.props.handleClose();
              }}
            >
              <div>
                {`The game is incomplete. There are ${
                  this.props.unlclickedtiles
                }
                 safe tiles remaining to be clicked for completion.`}
              </div>
            </ConfirmationModal>
          </div>
        );

      case "Victory":
        return (
          <div>
            <ConfirmationModal
              title={`Game WON!!!!`}
              handleOk={() => this.props.restartGame()}
              show={this.props.show}
              handleClose={() => {
                this.props.handleClose();
              }}
            >
              <div>
                Congratulations !!!. You have won the game. Do you want to
                restart ?
              </div>
            </ConfirmationModal>
          </div>
        );

      case "Lost":
        return (
          <div>
            <ConfirmationModal
              title={`Game Lost!`}
              handleOk={() => this.props.restartGame()}
              show={this.props.show}
              handleClose={() => {
                this.props.handleClose();
              }}
            >
              <div>
                Sorry !!!. You have lost the game. Do you want to restart ?
              </div>
            </ConfirmationModal>
          </div>
        );

      case "Default":
        return (
          <div>
            <ConfirmationModal
              title={`Game Lost!`}
              handleOk={() => this.props.handleClose()}
              show={this.props.show}
              handleClose={() => {
                this.props.handleClose();
              }}
            >
              <div>Game not started yet!</div>
            </ConfirmationModal>
          </div>
        );
      default:
        return null;
        break;
    }
  }
}
