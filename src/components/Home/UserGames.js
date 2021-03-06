import React from "react";
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

function StatusMessage(status) {
  let message = status.game;
  if (status.game === 'WIN') {
      message = "Win";
  }
  if (status.game === 'GAME_OVER') {
    message = "Game over";
  }
  if (status.game === 'GAME_IN_PROGRESS') {
    message = "In progress";
  }

  return (<div>{message}</div>)
}

function UserGames(games){
  const classes = useStyles();
    const userGames = games.games;

    let data = [];
    if (userGames !== undefined) {
      userGames.forEach(element => {
        const link = `/minesweeper/game/${element.id}`;
        let action;
        if (element.minesWeeperStatus === 'WIN' || element.minesWeeperStatus === 'GAME_OVER') {
          action = <Link to={{ pathname: link, state: { gameId: element.id, user: games.user} }}>See game</Link>
        } else {
          action = <Link to={{ pathname: link, state: { gameId: element.id, user: games.user } }}>Let's Play</Link>
        }

        data.push({
            id: element.id,
            rows: element.rows,
            cols: element.cols,
            mines: element.mines,
            status: element.minesWeeperStatus,
            time: element.timeTracking,
            action: action
        });
      });
    
    }
    return (
      <div>
          <h3>User's games</h3>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className="user-games">
              <TableRow>
                <TableCell align="center">Rows</TableCell>
                <TableCell align="center">Cols</TableCell>
                <TableCell align="center">Mines</TableCell>
                <TableCell align="center">Time (sec)</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.rows}</TableCell>
                  <TableCell align="center">{row.cols}</TableCell>
                  <TableCell align="center">{row.mines}</TableCell>
                  <TableCell align="center">{row.time}</TableCell>
                  <TableCell align="center"><StatusMessage game={row.status}/></TableCell>
                  <TableCell align="center">{row.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </div>
    )
}

export default UserGames;