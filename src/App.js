import React, { Component } from 'react';

import PieChart from './Chart';

const data = [
  {
    label: 'Extremely well',
    value: 5,
  },
  {
    label: 'Moderately well',
    value: 7,
  },
  {
    label: 'Slightly well',
    value: 2,
  },
  {
    label: 'Very well',
    value: 33,
  },
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Survey results</h1>
        <PieChart data={ data } />
      </div>
    );
  }
}

export default App;
