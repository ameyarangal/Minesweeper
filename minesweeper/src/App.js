import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./Components/Game";

class App extends Component {
  render() {
    let defaultBoard = new Array(8).fill(-10).map(() => new Array(8).fill(-10));
    return (
      <div className="App">
        <Game rows={8} cols={8} mines={10} defaultBoard={defaultBoard} />
      </div>
    );
  }
}

export default App;
