import React, { Component } from 'react';

import CalcScreen from './CalcScreen';
import CalcKey from './CalcKey';

function tackRight(cur, num, dec) {
  if (dec) {
    if (cur === null) {
      return parseFloat(`0.${num}`);
    }
    if (Number.isInteger(cur)) {
      return parseFloat([...cur.toString(), '.', num].join(''));
    }
  } else {
    return cur === null
      ? parseFloat(num)
      : parseFloat([...cur.toString(), num].join(''));
  }
}

const isInt = num => ({ a, b, func, dec }) => {
  const str = num.toString();
  if (func && b === null) {
    if (dec) {
      return { b: parseFloat(`0.${num}`) };
    } else return { b: num };
  }
  const nextB = b !== null ? tackRight(b, str, dec) : null;
  const nextA = nextB ? a : tackRight(a, str, dec);
  return { a: nextA, b: nextB };
};

const operFuncs = {
  div: (a, b) => {
    if (b === 0) return NaN;
    return a / b;
  },
  mul: (a, b) => {
    return a * b;
  },
};

const keys = [
  {
    value: 'AC',
    area: 'ac',
    fun: initState,
  },
  {
    value: '+/-',
    area: 'pm',
    fun: ({ prev, a, b }) => {
      if (a === null) {
        return { prev: -prev };
      }
      const nextB = b ? -b : null;
      const nextA = nextB ? a : -a;
      return { prev, a: nextA, b: nextB };
    },
  },
  {
    value: 'Del',
    area: 'del',
    fun: ({ prev, a, b }) => {
      if (a === null) {
        return { prev: +prev.toString().slice(0, -1) };
      }
      const nextB = b ? +b.toString().slice(0, -1) : null;
      const nextA = nextB ? a : +a.toString().slice(0, -1);
      return { prev, a: nextA, b: nextB };
    },
  },
  {
    value: '÷',
    area: 'div',
    fun: ({ prev, a, b, func }) => {
      if (!func) {
        if (a === null) {
          return { prev: 0, a: prev, func: operFuncs['div'] };
        } else {
          return { func: operFuncs['div'] };
        }
      }
      if (!b) {
        if (func === operFuncs['div']) {
          return;
        } else {
          return { func: operFuncs['div'] };
        }
      }
      const nextB = null;
      const nextA = b ? func(a, b) : func(prev, a);
      const nextFunc = operFuncs['div'];
      return { prev, a: nextA, b: nextB, func: nextFunc };
    },
  },
  {
    value: '7',
    area: 'sev',
    fun: isInt(7),
  },
  {
    value: '8',
    area: 'eig',
    fun: isInt(8),
  },
  {
    value: '9',
    area: 'nin',
    fun: isInt(9),
  },
  {
    value: '×',
    area: 'mul',
    fun: ({ prev, a, b, func }) => {
      if (!func) {
        if (a === null) {
          return { prev: 0, a: prev, func: operFuncs['mul'] };
        } else {
          return { func: operFuncs['mul'] };
        }
      }
      if (!b) {
        if (func === operFuncs['mul']) {
          return;
        } else {
          return { func: operFuncs['mul'] };
        }
      }
      const nextB = null;
      const nextA = b ? func(a, b) : func(prev, a);
      const nextFunc = operFuncs['mul'];
      return { prev, a: nextA, b: nextB, func: nextFunc };
    },
  },
  {
    value: '4',
    area: 'fou',
    fun: isInt(4),
  },
  {
    value: '5',
    area: 'fiv',
    fun: isInt(5),
  },
  {
    value: '6',
    area: 'six',
    fun: isInt(6),
  },
  {
    value: '−',
    area: 'sub',
    fun: ({ prev, a, b, func, neg }) => {
      if (func) {
        if (neg) {
          return { ...initState(), prev: prev - func(a, b), neg: true };
        } else {
          return { ...initState(), prev: prev + func(a, b), neg: true };
        }
      } else {
        if (neg) {
          return { ...initState(), prev: prev - a, neg: true };
        } else {
          return { ...initState(), prev: prev + a, neg: true };
        }
      }
    },
  },
  {
    value: '1',
    area: 'one',
    fun: isInt(1),
  },
  {
    value: '2',
    area: 'two',
    fun: isInt(2),
  },
  {
    value: '3',
    area: 'thr',
    fun: isInt(3),
  },
  {
    value: '+',
    area: 'add',
    fun: ({ prev, a, b, func, neg }) => {
      if (func) {
        if (neg) {
          return { ...initState(), prev: prev - func(a, b) };
        } else {
          return { ...initState(), prev: prev + func(a, b) };
        }
      } else {
        if (neg) {
          return { ...initState(), prev: prev - a };
        } else {
          return { ...initState(), prev: prev + a };
        }
      }
    },
  },
  {
    value: '0',
    area: 'zer',
    fun: isInt(0),
  },
  {
    value: '.',
    area: 'dec',
    fun: ({ prev, a, b, func }) => {
      if (func && !b) {
        return { b: 0 };
      }
    },
  },
  {
    value: '=',
    area: 'eq',
    fun: ({ prev, a, b, func, neg }) => {
      if (func) {
        if (neg) {
          return { ...initState(), prev: prev - func(a, b) };
        } else {
          return { ...initState(), prev: prev + func(a, b) };
        }
      } else {
        if (neg) {
          return { ...initState(), prev: prev - a };
        } else {
          return { ...initState(), prev: prev + a };
        }
      }
    },
  },
];

function initState() {
  return {
    prev: 0,
    a: null,
    b: null,
    func: null,
    neg: false,
    dec: false,
  };
}

class Calculator extends Component {
  state = initState();

  onClick = (fun, pressed) => () =>
    this.setState(state => {
      if (pressed === 'dec') {
        return { ...fun(state), pressed, dec: true };
      } else {
        return { ...fun(state), pressed, dec: false };
      }
    });

  render() {
    console.log(this.state);
    const { prev, a, b } = this.state;
    const dis = b ? b : a ? a : prev;
    const display = isNaN(dis) ? 'Err' : parseFloat(dis);
    return (
      <div className="Calc">
        <div className="CalcModel">Reactulator</div>
        <div className="CalcGrid">
          <CalcScreen>{display}</CalcScreen>
          {keys.map(o => (
            <CalcKey
              key={o.value}
              area={o.area}
              onClick={this.onClick(o.fun, o.area)}
            >
              {o.value}
            </CalcKey>
          ))}
        </div>
      </div>
    );
  }
}

export default Calculator;
