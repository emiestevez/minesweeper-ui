import React from 'react';
import PropTypes from 'prop-types';

export default class Cell extends React.Component {
  getValue() {
    const { status, value } = this.props;

    if (value.flag) {
      return "🚩";
    }
    if ((status === 'WIN' || status === 'GAME_OVER' || !value.covered) && value.mine) {
      return "💣";
    }
    if (!value.covered && value.minesAdjacent === 0) {
      return null;
    }

    if (!value.covered && value.minesAdjacent > 0) {
      return value.minesAdjacent;
    }

    return null;
  }

  render() {
    const { value, onClick, cMenu } = this.props;
    let className =
      "cell" +
      (value.covered ? "" : " hidden cell__visible cell__visible__" + this.getValue()) +
      (value.mine ? " is-mine" : "") +
      (value.flag ? " is-flag" : "");

    return (
      <div
        onClick={onClick}
        className={className}
        onContextMenu={cMenu}
      >
        {this.getValue()}
      </div>
    );
  }
}


