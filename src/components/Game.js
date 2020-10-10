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
            this.setState({ id: data.id, boardData: data});
        })
        .catch(console.log)
  }

  initBoardData(id) {
    fetch(`http://localhost:8080/minesweeper/${id}`)
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
    console.log("update.new value:", newValue);
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
              <Board gameId={this.state.id} rows={rows} cols={cols} mines={mines} boardData={boardData} onChange={this.handleChange}/>
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