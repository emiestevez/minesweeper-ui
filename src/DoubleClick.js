import React from "react";

class DoubleClick extends React.Component {
    state = {counter: 0}
  
    handleClick = () => {
     this.setState(state => ({
      counter: this.state.counter + 1,
    }))
   }
  
  
    handleDoubleClick = () => {
     this.setState(state => ({
      counter: this.state.counter - 2,
    }))
   }
  
   render() {
    return (
        <button onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
        </button>
    );
   }
  }

  export default DoubleClick;