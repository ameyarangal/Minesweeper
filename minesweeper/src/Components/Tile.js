import React, { PureComponent } from "react";
import "./Tile.css";
import landMine from "../Images/landMine.png";
import Flag from "../Images/Flag.png";
import WrongFlag from "../Images/WrongFlag.png";

export default class Tile extends PureComponent {
  handleLeftClick = (e, row, col, gameStatus) => {
    if (
      !this.props.cheat &&
      (gameStatus === "Default" || gameStatus === "Playing")
    ) {
      this.props.onclickHandler(e, row, col);
    }
  };

  handleRightClick = (e, row, col, gameStatus) => {
    if (
      !this.props.cheat &&
      (gameStatus === "Default" || gameStatus === "Playing")
    ) {
      this.props.handleRightClick(e, row, col);
    }
  };

  render() {
    const { row, col, value, display, flag, gameStatus } = this.props;
    let classname = "";
    switch (value) {
      case 1:
        classname += "one";
        break;

      case 2:
        classname += "two";
        break;
      case 3:
        classname += "three";
        break;
      case 4:
        classname += "four";
        break;
      case 5:
        classname += "five";
        break;
      case 6:
        classname += "six";
        break;
      case 7:
        classname += "seven";
        break;
      case 8:
        classname += "eight";
        break;

      default:
        classname += "default";
        break;
    }

    if (flag) {
      // When a tile is flagged it is hidden by default. But if the player loses and the flagged tile is non mine
      // then we mark the tile as wrongly marked.
      return (
        <div
          className="tile hideTile"
          onClick={e => this.handleLeftClick(e, row, col, gameStatus)}
          onContextMenu={e => this.handleRightClick(e, row, col, gameStatus)}
        >
          <div className="content">
            {value >= 0 && gameStatus === "Lost" ? (
              <img src={WrongFlag} className="img" />
            ) : (
              <img src={Flag} className="img" />
            )}
          </div>
        </div>
      );
    }
    if (value == -1) {
      // If the tile is a mine then depending on display property we decide whether to show the mine or not.
      return (
        <div
          className={display == true ? "tile showTile mine" : "tile hideTile "}
          onClick={e => this.handleLeftClick(e, row, col, gameStatus)}
          onContextMenu={e => this.handleRightClick(e, row, col, gameStatus)}
        >
          <div className="content">
            {display && <img src={landMine} className="img" />}
          </div>
        </div>
      );
    } else if (value > 0) {
      // If the tile is non mine then depending on display property we decide whether to show the neighbouring
      // mine count or not.
      return (
        <div
          className={display == true ? "tile showTile" : "tile hideTile"}
          onClick={e => this.handleLeftClick(e, row, col, gameStatus)}
          onContextMenu={e => this.handleRightClick(e, row, col, gameStatus)}
        >
          <div className="content">
            {display && <div className={classname}>{value}</div>}{" "}
          </div>
        </div>
      );
    } else if (value == 0) {
      // If the tile is 0 tile then depending on display property we decide whether to show the empty tile
      // or not.
      return (
        <div
          className={display == true ? "tile showTile" : "tile hideTile"}
          onClick={e => this.handleLeftClick(e, row, col, gameStatus)}
          onContextMenu={e => this.handleRightClick(e, row, col, gameStatus)}
        >
          <div className="content"> </div>
        </div>
      );
    }
    return (
      // This is to accomodate the case when the game has not started.
      <div
        className="tile hideTile"
        onClick={e => this.handleLeftClick(e, row, col, gameStatus)}
        onContextMenu={e => this.handleRightClick(e, row, col, gameStatus)}
      >
        <div className="content"> </div>
      </div>
    );
  }
}
