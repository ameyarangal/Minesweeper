import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Tile from "./Tile";
import "./Board.css";
import {
  placeMines,
  calculate_board_with_Neighbors,
  click_all_adjacent_0_cells
} from "../Utility/MinesweeperUtility";

export default class Board extends Component {
  constructor(props) {
    super(props);

    let detailedBoard = this.props.board;

    this.props.board.map((row, i) => {
      row.map((col, j) => {
        detailedBoard[i][j] = { value: this.props.board[i][j], display: false };
      });
    });

    this.state = {
      board: detailedBoard,
      rows: this.props.rows,
      cols: this.props.cols,
      mines_num: this.props.mines_number,
      mines: [],
      status: "Default",
      unclicked: this.props.rows * this.props.cols
    };
  }

  handleOnTileClick = (i, j) => {
    console.log(`clicked tile i ${i} and j ${j}`);
    if (this.state.status === "Default") {
      let defaultBoard = this.state.board;
      defaultBoard[i][j]["value"] = 0;
      //   defaultBoard[i][j]["display"] = true;
      console.log(`changed value tile i ${i} and j ${j}`);
      let board_with_mines = placeMines(
        this.state.mines_num,
        defaultBoard,
        i,
        j
      );

      let updated_board = calculate_board_with_Neighbors(board_with_mines);
      console.log(`updated board with neighbors`, updated_board);
      let dfs_board = click_all_adjacent_0_cells(
        updated_board,
        i,
        j,
        updated_board.length,
        updated_board[0].length
      );
      //   console.log(object)
      this.setState({ board: dfs_board, status: "Playing" });
    } else if (
      this.state.board[i][j]["value"] === 0 &&
      this.state.status == "Playing"
    ) {
      let dfs_board = click_all_adjacent_0_cells(
        this.state.board,
        i,
        j,
        this.state.board.length,
        this.state.board[0].length
      );
      this.setState({ board: dfs_board });
    } else if (
      this.state.board[i][j]["value"] > 0 &&
      this.state.status == "Playing"
    ) {
      let previous_board = this.state.board;
      previous_board[i][j]["display"] = true;
      this.setState({ board: previous_board });
    } else {
      alert("LOST");
      this.setState({ status: "failed" });
    }
  };

  //   place mines except for i  and j, return object with new board and list of mine location

  render() {
    const board = this.state.board;
    console.log(board);
    return (
      <div>
        <Button>Validate</Button>
        <Button>Cheat</Button>
        <div className="boardContainer">
          {board.map((row, i) => {
            return (
              <div className="boardRow">
                {row.map((obj, j) => {
                  return (
                    <Tile
                      row={i}
                      col={j}
                      display={board[i][j]["display"]}
                      value={board[i][j]["value"]}
                      onclickHandler={(i, j) => {
                        this.handleOnTileClick(i, j);
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
