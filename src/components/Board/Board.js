import React from 'react';
import Cell from './../Cell/Cell';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import StatusMessage from './StatusMessages';
import Grid from '@material-ui/core/Grid';
export default class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      boardData: this.drawBoard(this.props.boardData, this.props.rows),
      gameStatus: this.props.boardData.minesWeeperStatus,
      mineCount: this.props.boardData.minesRemaining,
      rows: this.props.rows,
      cols: this.props.cols,
      gameId: this.props.gameId,
      errorMessage: ''
    };
  }

  drawBoard(data, rows) {
    let board = []
    for (var i = 0; i < rows; i++) {
      var aux = data.cells.filter(cell => cell.row === i);
      board.push(aux);
    }
    return board;
  }

  
  // Handle User Events
  handlePause() {
    fetch(`http://minesweeper-env.eba-vnygpypa.us-east-1.elasticbeanstalk.com/minesweeper/` + this.state.gameId + "/pause" , {
            method: 'PUT',
            mode: "cors"
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
              gameStatus:data.minesWeeperStatus,
              mineCount: data.minesRemaining,
              rows: this.props.rows,
              cols: this.props.cols,
              gameId: this.props.gameId
            });
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error(error);
        });
  }

  handleResume() {
    fetch(`http://minesweeper-env.eba-vnygpypa.us-east-1.elasticbeanstalk.com/minesweeper/` + this.state.gameId + "/resume" , {
            method: 'PUT',
            mode: "cors"
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
              gameStatus:data.minesWeeperStatus,
              mineCount: data.minesRemaining,
              rows: this.props.rows,
              cols: this.props.cols,
              gameId: this.props.gameId
            });
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error(error);
        });
  }

  handleUserGames() {
    this.setState({ user: this.state.user, redirectToGame: true, link: `/minesweeper/user/${this.state.user}` })
  }

  handleCellClick(x, y) {
    fetch(`http://minesweeper-env.eba-vnygpypa.us-east-1.elasticbeanstalk.com/minesweeper/cell`, {
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
              gameStatus:data.minesWeeperStatus,
              mineCount: data.minesRemaining,
              rows: this.props.rows,
              cols: this.props.cols,
              gameId: this.props.gameId
            });
        })
        .catch(error => {
            this.setState({ error: error.toString() });
            console.error(error);
        });
  }

  handleContextMenu(e, x, y) {
    fetch(`http://minesweeper-env.eba-vnygpypa.us-east-1.elasticbeanstalk.com/minesweeper/cell/flag`, {
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
              gameStatus:data.minesWeeperStatus,
              mineCount: data.minesRemaining,
              rows: this.props.rows,
              cols: this.props.cols,
              gameId: this.props.gameId
            });
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error(error);
        });
  }

  renderBoard() {
    return this.state.boardData.map((datarow) => {
      return datarow.map((dataitem) => {
        const disabled = (!dataitem.covered && !dataitem.flag) || this.state.gameStatus === 'WIN' 
              || this.state.gameStatus === 'GAME_OVER' || this.state.gameStatus === 'PAUSE';
        return (
          <div key={dataitem.row * datarow.length + dataitem.col}>
            <Cell
              onClick={() => !disabled && this.handleCellClick(dataitem.row, dataitem.col)}
              cMenu={(e) => !disabled && this.handleContextMenu(e, dataitem.row, dataitem.col)}
              value={dataitem}
            />
            {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
          </div>);
      })
    });

  }

  render() {

    if (this.state.redirectToGame) {
      return <Redirect to={{ pathname: this.state.link, state: { user: this.state.user} }} />
    }

    const classGameInfo = "game-info game-info__visible__" + this.state.gameStatus;
    const disabled = this.state.gameStatus === 'WIN' || this.state.gameStatus === 'GAME_OVER';
    
    return (
      
      <div className="board">
        { this.state.errorMessage &&
      <h3 className="error"> { this.state.errorMessage } </h3> }
        <div className={classGameInfo}>
          <span className="info">Mines remaining: {this.state.mineCount}</span>
          <StatusMessage gameStatus={this.state.gameStatus}/>
        </div>
        <Button className="button" onClick={() => this.handleUserGames()}>User's Games</Button>
        <Button className="button" onClick={() => !disabled && this.handlePause()}>Pause</Button>
        <Button className="button" onClick={() => !disabled && this.handleResume()}>Resume</Button>
        <div>

        <Grid container spacing={3}>
          <Grid item xs={2}>
              <h4>How to play:</h4>
              <b>Flag cell:</b> rigth-click<br/>
              <b>Discover cell:</b> click
          </Grid>
          <Grid item xs={10}>
            <div className="container">
          {
            this.renderBoard(this.state.boardData)
          }
        </div>
          </Grid>
        </Grid>
        </div>
      </div>
    );
  }
}
