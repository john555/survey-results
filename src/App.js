import React, { Component } from 'react';

import Header from './containers/Header';
import Main from './containers/Main';
import Question from './components/question/Question';

const data = {
  question: 'What is the real question?',
  answers: [
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
  ],
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Main>
            <Question data={data} />
          </Main>
        </div>

      </div>
    );
  }
}

export default App;
