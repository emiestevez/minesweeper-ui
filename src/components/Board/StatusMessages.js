import React from "react";

function StatusMessage(game) {
    let message = game.gameStatus;
    if (game.gameStatus === 'WIN') {
        message = 'Congratulations!!! you win!!!';
    }
    if (game.gameStatus === 'GAME_OVER') {
        message = 'Ups!!! you loose!!!';
    }
    if (game.gameStatus === 'GAME_IN_PROGRESS') {
        message = 'Playing...';
    }

    return (<div><h1 className="info">{message}</h1></div>)
}

export default StatusMessage;