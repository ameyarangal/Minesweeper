import React, { PureComponent } from "react";
import { Button } from "react-bootstrap";
import Board from "./Board";
import NewGameModal from "./NewGameModal";

export default class Game extends PureComponent {
  state = {
    newBoard: this.props.defaultBoard,
    rows: this.props.rows,
    cols: this.props.cols,
    difficulty: "",
    mines: this.props.mines,
    showNewGameModal: false
  };

  render() {
    return (
      <div>
        <div />

        <Board
          board={this.state.newBoard}
          mines_number={this.props.mines}
          rows={this.props.rows}
          cols={this.props.cols}
          difficulty={this.props.difficulty}
        />
      </div>
    );
  }
}
