import React, { PureComponent } from "react";
import "./Help.css";
import { Container, Row } from "react-bootstrap";

export default class Help extends PureComponent {
  render() {
    return (
      //   <div className="help">
      <Container className="help">
        <Row>
          <h2>Game</h2>
        </Row>
        <Row>
          <h4>Rules</h4>
          <hr />
        </Row>

        <ol>
          <Row>
            <li>
              Game starts when player left clicks on any one of the tile, that
              tile is always a 0 tile.
            </li>
          </Row>
          <Row>
            <li>
              When player clicks a 0 tile, all the neighboring tiles with first
              occurring non 0 tile or mine tile are displayed.
            </li>
          </Row>
          <Row>
            <li>
              During the game, each tile denotes the number of mines that are in
              immediate neighboring tiles (vertical, horizontal and diagonal).
            </li>
          </Row>
          <Row>
            <li>
              User can flag a particular tile by right clicking that tile if he
              thinks it may contain a mine.
            </li>
          </Row>
          <Row>
            <li>When player clicks on a mine, the game ends in Loss.</li>
          </Row>
          <Row>
            <li>
              On losing, if the player has wrongly flagged a tile as mine then
              it will be shown with a cross sign.
            </li>
          </Row>
          <Row>
            <li>
              If the player successfully clicks all the safe tiles the game ends
              in victory and the timer value is considered as score.
            </li>
          </Row>
          <Row>
            <li>
              On winning, all the mine locations are displayed but with a flag
              on it.
            </li>
          </Row>
        </ol>
        <Row>
          <h4>Validate</h4>
        </Row>
        <Row>
          <p>
            When the game has started, if the player clicks on validate then a
            modal is shown with number of tiles that needs to be clicked in
            order to complete (Win/Lose) the game. If the game is not started or
            is ended, this button is disabled.
          </p>
        </Row>
        <Row>
          <h4>Cheat</h4>
        </Row>
        <Row>
          <p>
            When the game has started, if the player clicks on cheat button then
            mines locations are shown temporarily for 2 seconds during which
            tile clicks are disabled. After 2 seconds the user board is enabled
            and hiding all the mines location.
          </p>
        </Row>
        <Row>
          <h4>New Game</h4>
        </Row>
        <Row>
          <p>
            A player can click on New game button and select a difficulty level
            or provide a custom board configuration.
          </p>
        </Row>
        <Row>
          <h4>Restart Game</h4>
        </Row>
        <Row>
          <p>
            On winning or losing a particular game, player has an option to
            restart the game (contains same configuration)
          </p>
        </Row>
        <Row>
          <h4>Timer</h4>
        </Row>
        <Row>
          <p>
            Increments after every 1 second. On winning, the timer value is
            considered as score.
          </p>
        </Row>
        <Row>
          <h4>Flags</h4>
        </Row>
        <Row>
          <p>
            They are used to mark a tile as mine. They are initialized with
            number of mines on the board. On every flag placement, its value
            decreases.
          </p>
        </Row>
        <Row>
          <h2>Application</h2>
        </Row>
        <Row>
          <h4>Home</h4>
        </Row>
        <Row>
          <p>
            On home screen, a player can play the minesweeper game with or
            without login. Login is optional for playing a game.
          </p>
        </Row>
        <Row>
          <h4>Login</h4>
        </Row>
        <Row>
          <p>
            Used to login to the application. Logged in user’s playing history
            will be logged and considered for Leader board.
          </p>
        </Row>
        <Row>
          <h4>Register</h4>
        </Row>
        <Row>
          <p>Used to register a new user to the application.</p>
        </Row>
        <Row>
          <h4>User</h4>
        </Row>
        <Row>
          <p>
            Shows player’s game history with status, score, date and difficulty
            level. User needs to be logged in to use this feature.
          </p>
        </Row>
        <Row>
          <h4>Leader Board</h4>
        </Row>
        <Row>
          <p>
            Shows top 10 user’s who completed the game winning in shortest time
            depending on difficulty level. User needs to be logged in to use
            this feature.
          </p>
        </Row>
      </Container>
    );
  }
}
