import React, { Component } from 'react';

import Header from './containers/Header';
import Main from './containers/Main';
import Question from './components/question/Question';
import Answer from './components/answer/Answer';

const data = [{
  question: 'Question?',
  responses:
    [ 
      { 
        group: 'Group', 
        responses: [
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
        ] 
    },
  ]
}];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...data[0],
    }

  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Main>
            <Question question={this.state.question}>
              {
                this.state.responses.map((response, index) => (
                  <Answer
                    key={JSON.stringify(response.responses)}
                    group={response.group}
                    data={response.responses}
                  />
                ))
              }
            </Question>
          </Main>
        </div>
      </div>
    );
  }
}

export default App;
