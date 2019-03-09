import React, { Component } from "react";
import "./Tile.css";

export default class Tile extends Component {
  render() {
    const { row, col, value } = this.props;
    return (
      <div
        className={value == -1 ? "tile mine" : "tile"}
        onClick={() => this.props.onclickHandler(row, col)}
      >
        {/* {row} */}
        {/* {col} */}
        {/* {this.props.display} */}
        {value}
      </div>
    );
  }
}
