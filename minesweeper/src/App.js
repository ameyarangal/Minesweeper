import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./Components/Game";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game rows={8} cols={8} mines={10} />
      </div>
    );
  }
}

export default App;
