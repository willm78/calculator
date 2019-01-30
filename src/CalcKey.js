import React, { Component } from 'react';

class CalcKey extends Component {
  render() {
    const { area, onClick, children } = this.props;
    return (
      <button
        onClick={onClick}
        className="CalcKey"
        style={{ gridArea: `${area}` }}
      >
        {children}
      </button>
    );
  }
}

export default CalcKey;
