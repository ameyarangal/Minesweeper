import React, { Component, PureComponent } from "react";
import { Button, Alert, Badge } from "react-bootstrap";
import Tile from "./Tile";
import "./Board.css";
import {
  placeMines,
  calculate_board_with_Neighbors,
  click_all_adjacent_0_cells,
  return_winning_board
} from "../Utility/MinesweeperUtility";
import ConfirmationModal from "./ ConfirmationModal";
import RestartGameModal from "./RestartGameModal";
import GameConfirmationModal from "./GameConfirmationModal";
import NewGameModal from "./NewGameModal";
import Timer from "./Timer";

export default class Board extends PureComponent {
  state = {
    board: this.props.board,
    rows: this.props.rows,
    cols: this.props.cols,
    mines_num: this.props.mines_number,
    status: "Default",
    unlclickedtiles: this.props.rows * this.props.cols,
    showRestartGame: false,
    showValidateGame: false,
    showGameConfirmation: false,
    showNewGameModal: false,
    totalTiles: this.props.rows * this.props.cols,
    clickedTiles: 0,
    flags: this.props.mines_number,
    startTimer: false,
    endTimer: false,
    restartTimer: false
  };

  handleRightClick = (e, i, j) => {
    e.preventDefault();

    // Copy existing board from state for mutation.
    let currentBoard = [];
    this.state.board.map((row, i) => {
      let newrow = [];
      row.map((col, j) => {
        newrow.push({
          value: col["value"],
          display: col["display"],
          flag: col["flag"]
        });
      });
      currentBoard.push(newrow);
    });

    if (
      this.state.flags > 0 &&
      currentBoard[i][j]["flag"] != true &&
      currentBoard[i][j]["display"] != true
    ) {
      currentBoard[i][j]["flag"] = true;
      this.setState({
        board: currentBoard,
        flags: this.state.flags - 1
      });
    }
  };

  handleOnTileClick = (e, i, j) => {
    e.preventDefault();
    // Copy existing board from state for mutation.
    let currentBoard = [];
    this.state.board.map((row, i) => {
      let newrow = [];
      row.map((col, j) => {
        newrow.push({
          value: col["value"],
          display: col["display"],
          flag: col["flag"]
        });
      });
      currentBoard.push(newrow);
    });

    if (currentBoard[i][j]["flag"] == true) {
      currentBoard[i][j]["flag"] = false;
      this.setState({
        board: currentBoard,
        flags: this.state.flags + 1
      });
    }

    // If the game is not started, make first click tile as 0
    else if (this.state.status === "Default") {
      currentBoard[i][j]["value"] = 0;

      //   Place mines on the board.
      let board_with_mines = placeMines(
        this.state.mines_num,
        currentBoard,
        i,
        j
      );

      //   Update neighbors to create the entire board
      let updated_board = calculate_board_with_Neighbors(board_with_mines);

      //   Make all tile with adjacent 0 as clicked
      let result = click_all_adjacent_0_cells(
        updated_board,
        i,
        j,
        updated_board.length,
        updated_board[0].length,
        0
      );

      if (this.isGameWon(result.clicked)) {
        this.setWinningBoard(result.board);
      } else {
        this.setState({
          board: result.board,
          status: "Playing",
          clickedTiles: result.clicked,
          startTimer: true,
          restartTimer: false
        });
      }
    } else if (
      currentBoard[i][j]["value"] === 0 &&
      this.state.status == "Playing"
    ) {
      let result = click_all_adjacent_0_cells(
        currentBoard,
        i,
        j,
        this.state.board.length,
        this.state.board[0].length,
        0
      );
      if (this.isGameWon(this.state.clickedTiles + result.clicked)) {
        this.setWinningBoard(result.board);
      } else {
        this.setState({
          board: result.board,
          clickedTiles: this.state.clickedTiles + result.clicked
        });
      }
    } else if (
      currentBoard[i][j]["value"] > 0 &&
      this.state.status == "Playing"
    ) {
      currentBoard[i][j]["display"] = true;

      if (this.isGameWon(this.state.clickedTiles + 1)) {
        this.setWinningBoard(currentBoard);
      } else {
        this.setState({
          board: currentBoard,
          clickedTiles: this.state.clickedTiles + 1
        });
      }
    } else {
      this.setFailedBoard(currentBoard);
      //   setTimeout(() => {
      //     this.setState({ showGameConfirmation: true });
      //   }, 2000);
    }
  };

  isGameWon = tilesClicked => {
    let safe_tiles = this.state.rows * this.state.cols - this.state.mines_num;
    if (safe_tiles == tilesClicked) {
      return true;
    } else {
      return false;
    }
  };

  setWinningBoard = board => {
    let winningBoard = return_winning_board(board);

    this.setState({
      board: winningBoard,
      clickedTiles: 0,
      status: "Victory",
      startTimer: false,
      endTimer: false,
      showGameConfirmation: true
    });
    // setTimeout(() => {
    //   this.setState({ showGameConfirmation: true });
    // }, 2000);
  };

  setFailedBoard = board => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j]["value"] == -1) {
          board[i][j]["display"] = true;
        }
      }
    }

    this.setState({
      status: "Lost",
      board: board,
      endTimer: true,
      showGameConfirmation: true
    });
  };

  cheat = () => {
    if (this.state.status === "Playing") {
      let currentBoard = Object.assign([], this.state.board);

      let cheatedboard = [];
      this.state.board.map((row, i) => {
        let newrow = [];
        row.map((col, j) => {
          if (col["value"] == -1) {
            newrow.push({ value: -1, display: true });
          } else {
            newrow.push({ value: col["value"], display: col["display"] });
          }
        });
        cheatedboard.push(newrow);
      });

      this.setState({ board: cheatedboard });

      setTimeout(() => {
        this.setState({ board: currentBoard });
      }, 3000);
    }
  };

  validate = () => {
    if (this.state.status === "Playing") {
      let tiles_clicked = 0;
      let total_tiles = this.state.rows * this.state.cols;
      this.state.board.map(row => {
        row.map(col => {
          if (col["display"] === true) {
            tiles_clicked += 1;
          }
        });
      });

      let unclickedtiles = total_tiles - tiles_clicked - this.state.mines_num;

      if (unclickedtiles > 0) {
        this.setState({
          unclickedtiles: unclickedtiles,
          status: "Playing",
          showGameConfirmation: true,
          unlclickedtiles: unclickedtiles
        });
      } else if (unclickedtiles == 0) {
        this.setState({
          unclickedtiles: unclickedtiles,
          status: "Victory",
          showGameConfirmation: true,
          unlclickedtiles: unclickedtiles
        });
      }
    }
  };

  restartGame = () => {
    let newBoard = [];
    for (let i = 0; i < this.state.rows; i++) {
      const cols = [];
      for (let j = 0; j < this.state.cols; j++) {
        cols.push({ value: -10, display: false });
      }
      newBoard.push(cols);
    }

    this.setState({
      board: newBoard,
      showGameConfirmation: false,
      status: "Default",
      flags: this.state.mines_num,
      startTimer: false,
      endTimer: false,
      restartTimer: true
    });
  };

  newGame = () => {
    this.setState({ showNewGameModal: true });
  };

  handleNewGame = (rows, cols, mines, difficulty) => {
    let newBoard = [];
    for (let i = 0; i < rows; i++) {
      const column = [];
      for (let j = 0; j < cols; j++) {
        column.push({ value: -10, display: false });
      }
      newBoard.push(column);
    }

    this.setState({
      board: newBoard,
      rows: rows,
      cols: cols,
      mines_num: mines,
      flags: mines,
      showNewGameModal: false,
      status: "Default",
      restartTimer: true
    });
  };

  render() {
    const board = this.state.board;
    console.log(board);
    return (
      <div>
        <GameConfirmationModal
          gameStatus={this.state.status}
          show={this.state.showGameConfirmation}
          restartGame={() => this.restartGame()}
          handleClose={() => {
            this.setState({ showGameConfirmation: false });
          }}
          unlclickedtiles={this.state.unlclickedtiles}
        />
        <NewGameModal
          show={this.state.showNewGameModal}
          handleOk={(r, c, m, d) => this.handleNewGame(r, c, m, d)}
          handleClose={() => this.setState({ showNewGameModal: false })}
        />

        <div className="boardContainer">
          <div className="boardControls">
            <Button
              bsstyle="primary"
              className="button"
              onClick={() => this.newGame()}
            >
              New Game
            </Button>
            <Button
              bsstyle="primary"
              className="button"
              onClick={() => this.validate()}
              disabled={this.state.status === "Default" ? true : false}
            >
              Validate
            </Button>
            <Button
              bsstyle="primary"
              className="button"
              onClick={() => this.cheat()}
              disabled={this.state.status === "Default" ? true : false}
            >
              Cheat
            </Button>
            <div className="boardDisplay">
              <h3 className="margin">
                <Badge>Flag</Badge>
                <Alert variant="primary">{this.state.flags}</Alert>
              </h3>
              <Timer
                start={this.state.startTimer}
                end={this.state.endTimer}
                restart={this.state.restartTimer}
              />
            </div>
          </div>

          {board.map((row, i) => {
            return (
              <div key={"row" + i} className="boardRow">
                {row.map((obj, j) => {
                  return (
                    <Tile
                      key={"col" + j}
                      row={i}
                      col={j}
                      display={board[i][j]["display"]}
                      value={board[i][j]["value"]}
                      flag={board[i][j]["flag"]}
                      gameStatus={this.state.status}
                      onclickHandler={(e, i, j) => {
                        this.handleOnTileClick(e, i, j);
                      }}
                      handleRightClick={(e, i, j) =>
                        this.handleRightClick(e, i, j)
                      }
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
