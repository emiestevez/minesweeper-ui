import React from "react";
import Cell from './../Cell/Cell';
import CellFunction from './../Cell/CellFunction';

class Rows extends React.Component{
    constructor(props) {
      super(props);
      console.log("Cols - props: ", props);
      // find all the cell of 1 row
      this.state = { properties: props.properties, index: props.index, cells: props.properties.cells.filter(cell => cell.row === props.index)}
      this.cellRefs = this.state.cells.map(() => {
        return React.createRef();
      });
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newValue) {
      this.props.onChange(newValue);
    }

    cellRevealHandler() {
      console.log('cellRevealHandler');
    }

    flagPlantingHandler() {
      console.log('flagPlantingHandler');
    }
    
    render() {
      console.log(this.state);
        return this.state.cells.map((cell, index) => {
            return <Cell cell={cell} game={this.state.properties}/>
        })
    }

} 

export default Rows;