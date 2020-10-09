import React from 'react';
import PropTypes from 'prop-types';

export default class Cell extends React.Component {
  getValue() {
    const { value } = this.props;

    if (value.flag) {
      return "🚩";
    }
    if (!value.covered && value.mine) {
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
      (value.covered ? "" : " hidden") +
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


