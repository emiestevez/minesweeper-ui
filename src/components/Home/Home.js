import React from "react";
import UserGames from "./UserGames";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link, Redirect } from 'react-router-dom';

class Home extends React.Component{

  constructor(props) {
    console.log("Home");
    super(props);
    const { state } = this.props.history.location;
    this.state = { user: state.user, redirectToGame: false, mines: 0, cols: 0, rows: 0 }
  }

  componentDidMount() {
    fetch(`http://minesweeper-env.eba-vnygpypa.us-east-1.elasticbeanstalk.com/minesweeper/user/${this.state.user}`)
        .then((resp) => {
            const data = resp.json();
            if (!resp.ok) {
                const error = (data && data.message) || resp.status;
                return Promise.reject(error);
            }
            return data;
        })
        .then((data) => {
            this.setState({ userGames: data, user: this.state.user });
        })
        .catch(console.log)
  }

  handleChangeRow(newRow) {
    this.setState({ 
      user: this.state.user, 
      redirectToGame: false, 
      mines: this.state.mines, 
      cols: this.state.cols, 
      rows: newRow });
  }

  handleChangeCol(newCol) {
    this.setState({ 
      user: this.state.user, 
      redirectToGame: false, 
      mines: this.state.mines, 
      cols: newCol, 
      rows: this.state.rows });
  }

  handleChangeMine(newMine) {
    this.setState({ 
      user: this.state.user, 
      redirectToGame: false, 
      mines: newMine, 
      cols: this.state.cols, 
      rows: this.state.rows });
  }

  handleSubmit() {
    
    fetch(`http://minesweeper-env.eba-vnygpypa.us-east-1.elasticbeanstalk.com/minesweeper`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: this.state.user,
                cols: this.state.cols,
                rows: this.state.rows,
                mines: this.state.mines
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
        var games = this.state.userGames;
        games.push(data);
        //this.setState({ userGames: games, user: this.state.user });
        this.setState({ user: data.userName, redirectToGame: true, gameInfo: data, link: `/minesweeper/game/${data.id}` })
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error(error);
      });
  }

  render() {

    if (this.state.redirectToGame) {
      return <Redirect to={{ pathname: this.state.link, state: { user: this.state.user, gameId: this.state.gameInfo.id } }} />
    }
    return (
      <div className="App beginForm">
          <div className="title"> <h2>Minesweeper Home Page</h2>

          <form noValidate autoComplete="off">
            <TextField id="rows" label="Rows" value={this.state.rows} onChange={event => this.handleChangeRow(event.target.value)} />
            <TextField id="cols" label="Cols" value={this.state.cols} onChange={event => this.handleChangeCol(event.target.value)}  />
            <TextField id="mines" label="Mines" value={this.state.mines} onChange={event => this.handleChangeMine(event.target.value)} />
            <br></br><Button className="button" onClick={() => this.handleSubmit()}>Create</Button>
          </form>

          <UserGames games={this.state.userGames} user={this.state.user}/>

          </div>
      </div>
    )
    
  }
}

export default Home;