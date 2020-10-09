import React from "react";
import Rows from "./Rows";

class Board extends React.Component {
    constructor(props) {
        super(props);
        console.log("Board - props: ", props);
        this.state = { game: props.properties };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newValue) {
      console.log("New Value: ", newValue);
      this.setState({ game: newValue});
      console.log('state setted');
      this.props.onChange(newValue);
  }
    
    render() {
        const rows = [];
        for (var i = 0; i < this.state.game.rows; i++) {
                rows.push(<div key={i} className="rTableRow"><Rows index={i} properties={this.state.game} onChange={this.handleChange}/></div>)
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