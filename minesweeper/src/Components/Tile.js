import React, { PureComponent } from "react";
import "./Tile.css";
import landMine from "../Images/landMine.png";
import Flag from "../Images/Flag.png";

export default class Tile extends PureComponent {
  render() {
    const { row, col, value, display, flag } = this.props;
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
      return (
        <div
          className="tile hide"
          onClick={() => this.props.onclickHandler(row, col)}
          onContextMenu={e => this.props.handleRightClick(e, row, col)}
        >
          <div className="content">
            <img src={Flag} className="img" />
            {/* {value} */}
          </div>
        </div>
      );
    }
    if (value == -1) {
      return (
        <div
          className={display == true ? "tile show mine" : "tile hide "}
          onClick={() => this.props.onclickHandler(row, col)}
          onContextMenu={e => this.props.handleRightClick(e, row, col)}
        >
          <div className="content">
            {display && <img src={landMine} className="img" />}
            {/* {value} */}
          </div>
        </div>
      );
    } else if (value > 0) {
      return (
        <div
          className={display == true ? "tile show" : "tile hide"}
          onClick={() => this.props.onclickHandler(row, col)}
          onContextMenu={e => this.props.handleRightClick(e, row, col)}
        >
          <div className="content">
            {display && <div className={classname}>{value}</div>}{" "}
          </div>
        </div>
      );
    } else if (value == 0) {
      return (
        <div
          className={display == true ? "tile show" : "tile hide"}
          onClick={() => this.props.onclickHandler(row, col)}
          onContextMenu={e => this.props.handleRightClick(e, row, col)}
        >
          <div className="content"> </div>
        </div>
      );
    }
    return (
      <div
        className="tile hide"
        onClick={() => this.props.onclickHandler(row, col)}
        onContextMenu={e => this.props.handleRightClick(e, row, col)}
      >
        <div className="content"> </div>
      </div>
    );
  }
}
