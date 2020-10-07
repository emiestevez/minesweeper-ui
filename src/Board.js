import React from "react";
import Cell from "./Cell";

class Board extends React.Component {
    constructor(props) {
        super(props);
        console.log("props: ", props);
        this.state = { game: props.game };
        
    }
    
    render() {
        const rows = [];
        for (var i = 0; i < this.state.game.rows; i++) {
            rows.push(<div className="board-row"><Cell/></div>)
        }
  
      return (
        <div>
           <div className="rTable">
                {rows}
            </div>
        </div>
      );
    }
  }

  export default Board;