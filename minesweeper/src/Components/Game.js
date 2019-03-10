import React, { PureComponent } from "react";
import { Button } from "react-bootstrap";
import Board from "./Board";
import NewGameModal from "./NewGameModal";

export default class Game extends PureComponent {
  //   constructor(props) {
  //     super(props);

  //     let defaultBoard = new Array(this.props.rows)
  //       .fill(-10)
  //       .map(() => new Array(this.props.cols).fill(-10));
  //   }

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
        />
      </div>
    );
  }
}
