import React from "react";
import './Cell.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons'

class Cell extends React.Component{
  constructor(props) {
      super(props);
      this.state = { cell: props.cell, game: props.game  };
      this.clickTimeout = null;
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newValue) {
      this.props.onChange(newValue);
    }

    handleClick(cell, game) {
      if (this.clickTimeout !== null) {
        //this.flag(cell, gameInfo);
        clearTimeout(this.clickTimeout)
        this.clickTimeout = null
      } else {
        this.clickTimeout = setTimeout(()=>{
        this.showCell(cell, game);
        clearTimeout(this.clickTimeout)
          this.clickTimeout = null
        }, 200)
      }
    } 

    showCell(cell, game) {
      console.log("invoke service in order to show cell");
      fetch(`http://localhost:8080/minesweeper/game/cell`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gameId: game.id,
                row: cell.row,
                col: cell.col
            })
        })
        .then((resp) => {
          console.log("Resp: ", resp);
            if(!resp.ok){
                const error = (resp.json() && resp.json().message) || resp.status;
                return Promise.reject(error);
            }
            return resp.json();
        })
        .then((gameUpadted) => {
          console.log("this.state.cell: ", this.state.cell);
          console.log("cellUpadted: ", gameUpadted);
          this.setState({ cell: gameUpadted.cells[this.state.index], game: gameUpadted, index: this.state.index});
        });
  
    }

    render() {
      console.log("Render cell");
      const isFlag = !this.state.cell.covered && this.state.cell.flag;
      const isHidden = this.state.cell.covered;
      const isMine = !this.state.cell.covered && this.state.cell.mine;
      
        if (isFlag) {
          return (<button className='cell'>
              <FontAwesomeIcon icon={faFlag} />
            </button>)
        }

      if (isMine)
      return (<button className='cell'>
            <FontAwesomeIcon icon={faBomb} />
        </button>)

      if (!isHidden)
        return (
            <button className='cell'>
              {this.state.cell.minesAdjacent}
            </button>
      );

      return (
        <button className='cell' 
          onClick={() => this.handleClick(this.state.cell, this.state.game )}
          onContextMenu={() => this.handleClick(this.state.cell, this.state.game )}
          >
        </button>
  );
    }
} 

export default Cell;