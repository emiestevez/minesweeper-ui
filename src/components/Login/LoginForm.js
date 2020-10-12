import React from 'react';
import './LoginForm.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUserName(newValue) {
    this.setState({value: newValue});
  }

  handleSubmit(event) {
    this.props.history.push('/minesweeper', { user: this.state.value });
  }

  render() {
      return(
        <div className="App">
        <h1>Minesweeper Game</h1>
        <div>
        
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField id="userName" label="User Name" value={this.state.value} onChange={event => this.handleChangeUserName(event.target.value)}/>
            <br></br><Button className="button" type="submit">Login</Button>
          </form>
      </div>
      </div>
      )
  }
}

export default LoginForm;
