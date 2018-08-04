import React, { Component } from 'react';

import PieChart from './components/chart/Chart';
import Header from './containers/Header';
import Main from './containers/Main';

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
        <Header />
        <div className="container">
          <Main>
            <PieChart data={ data } />
          </Main>
        </div>

      </div>
    );
  }
}

export default App;
