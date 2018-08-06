import React, { Component } from 'react';

import Header from './containers/Header';
import Main from './containers/Main';
import Question from './components/question/Question';
import Answer from './components/answer/Answer';
import Navigation from './components/navigation/Navigation';

const data = [{
  questionNumber: 1,
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
      data,
      currentIndex: 0,
    }
  }

  prev = () => {
    if (this.hasReacheStart()) {
      return;
    }

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex -= 1,
    }));
  }

  next =  () => {
    if (this.hasReachedEnd()) {
      return;
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex += 1,
    }));
  }

  hasReacheStart() {
    return 0 === this.state.currentIndex;
  }

  hasReachedEnd() {
    return (this.state.data.length - 1) === this.state.currentIndex;
  }

  render() {
    const data = this.state.data[this.state.currentIndex];
    return (
      <div className="App">
        <Header />
        <div className="navigationWrapper">
          <div className="container">
          <Navigation
            disablePreviousButton={this.hasReacheStart()}
            disableNextButton={this.hasReachedEnd()}
            previousButtonClick={this.prev}
            nextButtonClick={this.next}
            total={this.state.data.length}
            current={this.state.currentIndex + 1}
          />
          </div>
        </div>
        <div className="container">
          <Main>
            <Question questionNumber={data.questionNumber} question={data.question}>
              {
                data.responses.map((response) => (
                  <Answer
                    key={Math.random()}
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
