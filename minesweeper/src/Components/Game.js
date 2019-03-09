import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Board from "./Board";

export default class Game extends Component {
  constructor(props) {
    super(props);

    let defaultBoard = new Array(this.props.rows)
      .fill(-10)
      .map(() => new Array(this.props.cols).fill(-10));

    this.state = {
      newBoard: defaultBoard,
      rows: this.props.rows,
      cols: this.props.cols,
      difficulty: "",
      mines: this.props.mines
    };
  }

  render() {
    return (
      <div>
        <div>
          <Button>New Game</Button>
        </div>
        <Board
          board={this.state.newBoard}
          mines_number={this.state.mines}
          rows={this.state.rows}
          cols={this.state.cols}
        />
      </div>
    );
  }
}
