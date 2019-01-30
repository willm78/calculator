import React, { Component } from 'react';

import CalcScreen from './CalcScreen';
import CalcKey from './CalcKey';

const keys = [
  { value: 'AC', area: 'ac' },
  { value: '+/-', area: 'pm' },
  { value: 'Del', area: 'del' },
  { value: '÷', area: 'div' },
  { value: '7', area: 'sev' },
  { value: '8', area: 'eig' },
  { value: '9', area: 'nin' },
  { value: '×', area: 'mul' },
  { value: '4', area: 'fou' },
  { value: '5', area: 'fiv' },
  { value: '6', area: 'six' },
  { value: '−', area: 'sub' },
  { value: '1', area: 'one' },
  { value: '2', area: 'two' },
  { value: '3', area: 'thr' },
  { value: '+', area: 'add' },
  { value: '0', area: 'zer' },
  { value: '.', area: 'dec' },
  { value: '=', area: 'eq' },
];

class Calculator extends Component {
  state = {
    display: '0',
  };

  onClick = value => () => this.setState({ display: value });

  render() {
    const { display } = this.state;
    return (
      <div className="Calc">
        <div className="CalcGrid">
          <React.Fragment>
            <CalcScreen>{display}</CalcScreen>
            {keys.map(o => (
              <CalcKey
                key={o.value}
                area={o.area}
                onClick={this.onClick(o.value)}
              >
                {o.value}
              </CalcKey>
            ))}
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default Calculator;
