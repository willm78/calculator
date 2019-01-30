import React, { Component } from 'react';

class CalcScreen extends Component {
  render() {
    const { children } = this.props;
    return <div className="CalcScreen">{children}</div>;
  }
}

export default CalcScreen;
