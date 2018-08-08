import React, { Component } from 'react';
import axios from 'axios';

import Header from './containers/Header';
import Main from './containers/Main';
import Question from './components/question/Question';
import Answer from './components/answer/Answer';
import Navigation from './components/navigation/Navigation';
import config from './config';
import QuestionPlaceholder from './components/question/QuestionPlaceholder';
import { retrieveToken } from './helpers/token';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentIndex: 0,
    }
  }

  componentDidMount() {
    this.fetchData();

    document.body.onkeydown = this.bindKeyboardEvents;
  }

  fetchData = () => {
    const token = retrieveToken();

    if (token === '') {
      window.location = '/';
    }

    axios.get(`${config.API_URL}/data`, { headers: { token }})
    .then(response => {
      this.setState(prevState => ({
        ...prevState,
        data: response.data.data,
      }));
    })
    .catch(() => {
      window.location = '/';
    });
  }

  bindKeyboardEvents = event => {
    if (event.keyCode === 37) {
      this.prev();
    }

    if (event.keyCode === 39) {
      this.next();
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

  renderNavigation() {
    if(this.state.data.length === 0) {
      return;
    }

    return (
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
    );
  }

  renderQuestion() {
    if(this.state.data.length === 0) {
      return <QuestionPlaceholder />;
    }

    const data = this.state.data[this.state.currentIndex];

    return (
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
    );
  }

  render() {
    
    return (
      <div className="App">
        <Header />
        {this.renderNavigation()}
        <div className="container">
          <Main>
            {this.renderQuestion()}
          </Main>
        </div>
      </div>
    );
  }
}

export default App;
