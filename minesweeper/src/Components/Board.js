import React, { PureComponent } from "react";
import { Button, Alert, Badge } from "react-bootstrap";
import Tile from "./Tile";
import "./Board.css";
import {
  placeMines,
  calculate_board_with_Neighbors,
  click_all_adjacent_0_cells,
  return_winning_board
} from "../Utility/MinesweeperUtility";
import GameConfirmationModal from "./GameConfirmationModal";
import NewGameModal from "./NewGameModal";
import Timer from "./Timer";
import { postApi } from "../Common/Api";
import { connect } from "react-redux";

class Board extends PureComponent {
  state = {
    board: this.props.board,
    rows: this.props.rows,
    cols: this.props.cols,
    mines_num: this.props.mines_number,
    difficulty: this.props.difficulty,
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
    restartTimer: false,
    counter: 0,
    cheat: false
  };

  //   Handles functionality when user right clicks on a particular tile (i, j)
  handleRightClick = (e, i, j) => {
    e.preventDefault();

    // Copy existing board from state so as to avoid mutating the state directly.
    let currentBoard = [];
    this.state.board.map(row => {
      let newrow = [];
      row.map(col => {
        newrow.push({
          value: col["value"],
          display: col["display"],
          flag: col["flag"]
        });
      });
      currentBoard.push(newrow);
    });

    // Place a flag if the selected tile has no flag on it and is not already displayed.
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

  //   Handles functionality when user left clicks on a particular tile.
  handleOnTileClick = (e, i, j) => {
    e.preventDefault();

    // Copy existing board from state so as to avoid mutating the state directly.
    let currentBoard = [];
    this.state.board.map(row => {
      let newrow = [];
      row.map(col => {
        newrow.push({
          value: col["value"],
          display: col["display"],
          flag: col["flag"]
        });
      });
      currentBoard.push(newrow);
    });

    // If user clicks on a flagged tile, it should be unflagged.
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

      // Place random mines on the board providing the initial clicked tile position.
      let board_with_mines = placeMines(
        this.state.mines_num,
        currentBoard,
        i,
        j
      );

      // Update board where every tile is filled with number of neighboring mines value.
      let updated_board = calculate_board_with_Neighbors(board_with_mines);

      // Make all the neighbouring tiles appeared as click.
      let result = click_all_adjacent_0_cells(
        updated_board,
        i,
        j,
        updated_board.length,
        updated_board[0].length,
        0
      );

      // Check for game status.
      if (this.isGameWon(result.clicked)) {
        this.setWinningBoard(result.board);
      } else {
        this.setState({
          board: result.board,
          status: "Playing",
          clickedTiles: result.clicked,
          startTimer: true,
          endTimer: false,
          restartTimer: false
        });
      }
    } else if (
      currentBoard[i][j]["value"] === 0 &&
      this.state.status == "Playing"
    ) {
      // If the game is started and clicked tile is 0 then make all the adjacent tiles clicked.
      let result = click_all_adjacent_0_cells(
        currentBoard,
        i,
        j,
        this.state.board.length,
        this.state.board[0].length,
        0
      );
      console.log(
        `No of tiles clicked ${this.state.clickedTiles + result.clicked}`
      );
      // Check game status.
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
      // When user clicks a non zero tile while playing display only that tile.
      currentBoard[i][j]["display"] = true;
      console.log(`No of tiles clicked ${this.state.clickedTiles + 1}`);
      if (this.isGameWon(this.state.clickedTiles + 1)) {
        this.setWinningBoard(currentBoard);
      } else {
        this.setState({
          board: currentBoard,
          clickedTiles: this.state.clickedTiles + 1
        });
      }
    } else {
      // User loses as he clicks mine, so we set the board state to failed board.
      this.setFailedBoard(currentBoard);
    }
  };

  // Function to determine whether the game is Won or not depending on the tiles clicked and safe tile.
  //   safe tiles = total tiles - number of mines
  // tiles clicked = total tiles clicked by the user.
  // Returns - Boolean
  isGameWon = tilesClicked => {
    let safe_tiles = this.state.rows * this.state.cols - this.state.mines_num;
    console.log(`safe tiles are ${safe_tiles}`);
    console.log(`tiles clicked in isWon tiles are ${tilesClicked}`);
    if (safe_tiles == tilesClicked) {
      return true;
    } else {
      return false;
    }
  };

  // Updates the state with the winning board, marks the game status as Victory, end the timer
  // and shows the confirmation modal.
  setWinningBoard = board => {
    let winningBoard = return_winning_board(board);

    this.setState({
      board: winningBoard,
      clickedTiles: 0,
      status: "Victory",
      startTimer: false,
      endTimer: true,
      restartTimer: false,
      showGameConfirmation: true
    });
  };

  // Updates the state with the losing board, marks the game state as Lost, end the timer
  // and shows the confirmation modal.
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
      startTimer: false,
      endTimer: true,
      restartTimer: false,
      showGameConfirmation: true
    });
  };

  // Function to show the location of the mines temporarily (for 3 sec's) on the UI
  // when the user has started the game.
  cheat = () => {
    if (this.state.status === "Playing") {
      let currentBoard = Object.assign([], this.state.board);

      // Copy the board to create a cheated board where we display the mine location.
      let cheatedboard = [];
      this.state.board.map(row => {
        let newrow = [];
        row.map(col => {
          if (col["value"] == -1) {
            newrow.push({ value: -1, display: true });
          } else {
            newrow.push({ value: col["value"], display: col["display"] });
          }
        });
        cheatedboard.push(newrow);
      });

      this.setState({ board: cheatedboard, cheat: true });

      // Replace the board with the one that the user was plating before he hit cheat button.
      setTimeout(() => {
        this.setState({ board: currentBoard, cheat: false });
      }, 2000);
    }
  };

  // Function to show the status of the game, we give information on remaining tiles that needs
  // to be clicked to win the game. We check only for playing status as on Win and lose we give the
  // confirmation modal directly.
  validate = () => {
    if (this.state.status === "Playing") {
      let total_tiles = this.state.rows * this.state.cols;
      let unclickedtiles =
        total_tiles - this.state.clickedTiles - this.state.mines_num;

      this.setState({
        status: "Playing",
        showGameConfirmation: true,
        unlclickedtiles: unclickedtiles
      });
    }
  };

  // On restart game, we create a new board hacing same rows and cols.
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
      restartTimer: true,
      counter: 0
    });
  };

  // When new game button is clicked we show the modal for taking the new connfiguration.
  newGame = () => {
    this.setState({ showNewGameModal: true });
  };

  // Callback function which creates the new board depending on the new configuration and reset the rows, cols
  // mines value according to the new values.
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
      difficulty: difficulty,
      flags: mines,
      showNewGameModal: false,
      status: "Default",
      startTimer: false,
      endTimer: false,
      restartTimer: true,
      counter: 0
    });
  };

  handleTimerStop = time => {
    // this.setState({ counter: time });
    console.log(`time is ${time}`);
    if (this.props.isLoggedIn) {
      let postdata = {
        UserId: this.props.userId,
        Score: time,
        Status: this.state.status,
        Difficulty: this.state.difficulty
      };
      postApi(
        "/history",
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        },
        postdata
      );
    }
  };

  render() {
    const board = this.state.board;
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
              variant="dark"
              className="button"
              onClick={() => this.newGame()}
            >
              New Game
            </Button>
            <Button
              variant="dark"
              className="button"
              onClick={() => this.validate()}
              disabled={this.state.status !== "Playing" ? true : false}
            >
              Validate
            </Button>
            <Button
              variant="dark"
              className="button"
              onClick={() => this.cheat()}
              disabled={this.state.status !== "Playing" ? true : false}
            >
              Cheat
            </Button>
            <div className="boardDisplay">
              <h3 className="margin">
                <Badge>Flag</Badge>
                <Alert variant="dark">{this.state.flags}</Alert>
              </h3>
              <Timer
                start={this.state.startTimer}
                end={this.state.endTimer}
                restart={this.state.restartTimer}
                onTimerEnd={time => this.handleTimerStop(time)}
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
                      cheat={this.state.cheat}
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

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  loginMessage: state.user.loginMessage,
  userId: state.user.Id,
  firstName: state.user.FirstName,
  lastName: state.user.LastName,
  username: state.user.Username
});

export default connect(
  mapStateToProps,
  { postApi }
)(Board);
