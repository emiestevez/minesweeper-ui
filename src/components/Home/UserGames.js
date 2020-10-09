import { ContentSort } from "material-ui/svg-icons";
import React from "react";
import Reactable from 'reactable';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


function UserGames(games){
  console.log("Games: ", games);
    var Table = Reactable.Table;
    const userGames = games.games;

    let data = [];
    if (userGames !== undefined) {
      userGames.forEach(element => {
        const link = `/minesweeper/game/${element.id}`;

        data.push({
            rows: element.rows,
            cols: element.cols,
            mines: element.mines,
            status: element.minesWeeperStatus,
            action: <Link to={{ pathname: link, state: { gameId: element.id } }}>Play</Link>
        });
      });
    
    }
    return (
      <div>
          <h1>User's games</h1>
          <Table className="table" id="table" data={data} />
      </div>
    )
}

export default UserGames;