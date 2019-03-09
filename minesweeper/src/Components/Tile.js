import React, { Component } from "react";
import "./Tile.css";

export default class Tile extends Component {
  render() {
    const { row, col, value, display } = this.props;
    if (value == -1) {
      return (
        <div
          className={display == true ? "tile mine show" : "tile mine hide"}
          onClick={() => this.props.onclickHandler(row, col)}
        >
          {value}
        </div>
      );
    } else if (value > 0) {
      return (
        <div
          className={display == true ? "tile show" : "tile hide"}
          onClick={() => this.props.onclickHandler(row, col)}
        >
          {value}
        </div>
      );
    } else if (value == 0) {
      return (
        <div
          className={display == true ? "tile show" : "tile hide"}
          onClick={() => this.props.onclickHandler(row, col)}
        >
          .
        </div>
      );
    }
    return (
      <div
        className={value == -1 ? "tile mine" : "tile"}
        onClick={() => this.props.onclickHandler(row, col)}
      >
        {/* {row} */}
        {/* {col} */}
        {/* {this.props.display} */}
        {value}
        {this.props.display == true ? "Show" : ""}
      </div>
    );
  }
}
