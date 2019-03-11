import React, { PureComponent } from "react";
import Board from "../Components/Board";

let defaultBoard = new Array(8).fill(-10).map(() => new Array(8).fill(-10));
export default class Home extends PureComponent {
  render() {
    return (
      <div>
        <Board
          board={defaultBoard}
          mines_number={10}
          rows={8}
          cols={8}
          difficulty={"Easy"}
        />
      </div>
    );
  }
}
