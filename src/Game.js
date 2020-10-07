import { ContentSort } from "material-ui/svg-icons";
import React from "react";
import Board from "./Board";

class Game extends React.Component{

  constructor(props) {
    super(props);
    const { state } = this.props.history.location;
    console.log("Game - State: ", state);
    this.state = {game: state.game}
    console.log("This.state: ", this.state);
  }

  render() {
    return (
      <div className="App beginForm">
          <div className="title"> Minesweeper Home Page
          <Board game={ this.state.game }/>
      </div>
      </div>
    )
    
  }
}

export default Game;