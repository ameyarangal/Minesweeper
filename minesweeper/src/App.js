import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./Components/Game";
import Store from "./Components/Store";
import Header from "./Components/Header";
import { Provider } from "react-redux";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import LeaderBoard from "./Pages/LeaderBoard";
import User from "./Pages/User";
import { Route } from "react-router-dom";
import Help from "./Pages/Help";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Game
          rows={8}
          cols={8}
          mines={10}
          defaultBoard={defaultBoard}
          difficulty="Easy"
        /> */}
        <Provider store={Store}>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/leaderboard" component={LeaderBoard} />
          <Route exact path="/history" component={User} />
          <Route exact path="/help" component={Help} />
        </Provider>
      </div>
    );
  }
}

export default App;
