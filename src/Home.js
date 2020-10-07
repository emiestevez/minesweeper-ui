import React from "react";
import { Link, Redirect } from 'react-router-dom';

class Home extends React.Component{

  constructor(props) {
    super(props);
    const { state } = this.props.history.location;
    this.state = { user: state.user, redirectToGame: false, mines: 0, cols: 0, rows: 0 }
  }

  handleChangeRow(newRow) {
    this.setState({ 
      user: this.state.user, 
      redirectToGame: false, 
      mines: this.state.mines, 
      cols: this.state.cols, 
      rows: newRow });
    console.log("minesweeper: ", this.state);
  }

  handleSubmit() {
    console.log("call function to create game");
    const game = {
      id:1,
      col: 2,
      rows: 2,
      mines:1};

    console.log("minesweeper: ", this.state);
    this.setState({ user: this.state.user, game: game, redirectToGame: true, link: `/minesweeper/game/${game.id}` })
    
  }

  render() {
    if (this.state.redirectToGame) {
      console.log("Should redirect");
      console.log(this.state)
      return <Redirect to={{ pathname: this.state.link, state: { game: this.state.game } }} />
  }

    return (
      <div className="App beginForm">
          <div className="title"> Minesweeper Home Page

          <div>
            <label>
              Rows:
              <input type="text" value={this.state.rows} onChange={event => this.handleChangeRow(event.target.value)} />
            </label>
            <label>
              Cols:
              <input type="text" value={this.state.cols} onChange={event => this.cols(event.target.value)} />
            </label>
            <label>
              Mines:
              <input type="text" value={this.state.mines} onChange={event => this.mines(event.target.value)} />
            </label>
            <br/>
            <button className="button" onClick={() => this.handleSubmit()}>Create</button>
          </div>

          </div>
      </div>
    )
    
  }
}

export default Home;