import React, { Component } from "react";

export default class Game extends Component {
  constructor(props) {
    super(props);
    state = {
      board: [],
      rows: 0,
      cols: 0,
      difficulty: "Medium"
    };
  }

  render() {
    return <div />;
  }
}
