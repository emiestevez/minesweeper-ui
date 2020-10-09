import React from 'react';
import './LoginForm.css';


class LoginForm extends React.Component {
  constructor(props) {
    console.log("Login")
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log("Login-handleChange")
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log("Login-handleSubmit")
    event.preventDefault();
    this.props.history.push('/minesweeper', { user: this.state.value });
  }

  render() {
      return(
        <div className="App">
        <h1>MinesWeeper Game</h1>
        <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            userName:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
      </div>
      )
  }
}

export default LoginForm;
