import React from 'react';
import PropTypes from 'prop-types';
import Cell from './../Cell/Cell';

export default class Board extends React.Component {

  constructor(props) {
    console.log("Board");
    super(props);
    this.state = {
      //boardData: this.initBoardData(this.props.height, this.props.width, this.props.mines),
      boardData: this.drawBoard(this.props.boardData, this.props.rows),
      gameStatus: "Game in progress",
      mineCount: this.props.mines,
      rows: this.props.rows,
      cols: this.props.cols,
      gameId: this.props.gameId
    };
  }

  drawBoard(data, rows) {
    console.log("drawing...");
    let board = []
    for (var i = 0; i < rows; i++) {
      var aux = data.cells.filter(cell => cell.row === i);
      board.push(aux);
    }
    return board;
  }

  
  // Handle User Events

  handleCellClick(x, y) {
    console.log("HandleClick: ",x, y);
    fetch(`http://localhost:8080/minesweeper/game/cell`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gameId: this.state.gameId,
                row: x,
                col: y
            })
        })
        .then((resp) => {
            const data =  resp.json();
            if(!resp.ok){
                const error = (data && data.message) || resp.status;
                return Promise.reject(error);
            }
            return data;
        })
        .then((data)=>{
            this.setState({
              boardData: this.drawBoard(data, this.props.rows),
              gameStatus: "Game in progress",
              mineCount: this.props.mines,
              rows: this.props.rows,
              cols: this.props.cols,
              gameId: this.props.gameId
            });
            
            //this.props.onChange(data);
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error(error);
        });
  }

  handleContextMenu(e, x, y) {
    e.preventDefault();
    let updatedData = this.state.boardData;
    let mines = this.state.mineCount;

    // check if already revealed
    if (updatedData[x][y].isRevealed) return;

    if (updatedData[x][y].isFlagged) {
      updatedData[x][y].isFlagged = false;
      mines++;
    } else {
      updatedData[x][y].isFlagged = true;
      mines--;
    }

    if (mines === 0) {
      const mineArray = this.getMines(updatedData);
      const FlagArray = this.getFlags(updatedData);
      if (JSON.stringify(mineArray) === JSON.stringify(FlagArray)) {
        this.setState({ mineCount: 0, gameStatus: "You Win." });
        this.revealBoard();
        alert("You Win");
      }
    }

    this.setState({
      boardData: updatedData,
      mineCount: mines,
    });
  }

  renderBoard(data) {
    return this.state.boardData.map((datarow) => {
      return datarow.map((dataitem) => {
        return (
          <div key={dataitem.row * datarow.length + dataitem.col}>
            <Cell
              onClick={() => this.handleCellClick(dataitem.row, dataitem.col)}
              cMenu={(e) => this.handleContextMenu(e, dataitem.row, dataitem.col)}
              value={dataitem}
            />
            {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
          </div>);
      })
    });

  }

  render() {
    return (
      <div className="board">
        <div className="game-info">
          <span className="info">Mines remaining: {this.state.mineCount}</span>
          <h1 className="info">{this.state.gameStatus}</h1>
        </div>
        {
          this.renderBoard(this.state.boardData)
        }
      </div>
    );
  }
}

/* Board.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  mines: PropTypes.number,
} */