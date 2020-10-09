import { ContentSort } from "material-ui/svg-icons";
import React from "react";
import Board from "./Board/Board";

class Game extends React.Component{

  constructor(props) {
    super(props);
    const { state } = this.props.history.location;
    this.state = {id: state.gameId}
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:8080/minesweeper/${this.state.id}`)
        .then((resp) => {
            const data = resp.json();
            if (!resp.ok) {
                const error = (data && data.message) || resp.status;
                return Promise.reject(error);
            }
            return data;
        })
        .then((data) => {
            this.setState({ id: data.id, game: data});
        })
        .catch(console.log)
  }

  handleChange(newValue) {
    console.log("update");
    //this.setState({ game: game });
}

  render() {
    if (this.state.game !== undefined) {
      return (
        <div className="App beginForm">
            <div className="title"> Minesweeper Home Page
            <Board properties={this.state.game} game={this.state.game} onChange={this.handleChange}/>
        </div>
        </div>
      )  
    }
    return (
      <div className="App beginForm">
          <div className="title"> Minesweeper Home Page
      </div>
      </div>
    )
    
  }
}

export default Game;