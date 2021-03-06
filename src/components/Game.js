import { ContentSort } from "material-ui/svg-icons";
import React from "react";
import Board from "./Board/Board";
class Game extends React.Component{

  constructor(props) {
    super(props);
    const { state } = this.props.history.location;
    this.state = {id: state.gameId, user: state.user}
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`http://minesweeper-env.eba-vnygpypa.us-east-1.elasticbeanstalk.com/minesweeper/${this.state.id}`)
        .then((resp) => {
            const data = resp.json();
            if (!resp.ok) {
                const error = (data && data.message) || resp.status;
                return Promise.reject(error);
            }
            return data;
        })
        .then((data) => {
            this.setState({ id: data.id, boardData: data});
        })
        .catch(console.log)
  }

  initBoardData(id) {
    fetch(`http://minesweeper-env.eba-vnygpypa.us-east-1.elasticbeanstalk.com/minesweeper/${id}`)
        .then((resp) => {
            const data = resp.json();
            if (!resp.ok) {
                const error = (data && data.message) || resp.status;
                return Promise.reject(error);
            }
            return data;
        })
        .then((data) => {
            this.setState({ id: data.id, boardData: data});
        })
        .catch(console.log)
  }

  handleChange(newValue) {
    this.setState({ game: newValue });
}

  render() {
    if (this.state !== null) {
      if (this.state.boardData !== undefined) {
        const rows = this.state.boardData.rows;
        const cols = this.state.boardData.cols;
        const mines = this.state.boardData.mines;
        const boardData = this.state.boardData;
        return (
          <div className="App beginForm">
              <div className="game title"> 
              <h2>Minesweeper Home Page</h2>
              <Board user={this.state.user} gameId={this.state.id} rows={rows} cols={cols} mines={mines} boardData={boardData} onChange={this.handleChange}/>
          </div>
          </div>
        )  
      }
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