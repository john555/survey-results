import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Answer from '../answer/Answer';

class Question extends Component {
  static propTypes = {
    data: PropTypes.shape({
      question: PropTypes.string.isRequired,
      answers: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })),
    }),
  }
  render () {
    return (
      <section className="question">
        <header className="question__header">
          <h1 className="question__title">What is the question?</h1>
        </header>
        <div className="question__answers">
          {/* component */}
          <Answer data={this.props.data.answers}/>
          <Answer data={this.props.data.answers}/>
          <Answer data={this.props.data.answers}/>
          <Answer data={this.props.data.answers}/>
          <Answer data={this.props.data.answers}/>
          <Answer data={this.props.data.answers}/>
          <Answer data={this.props.data.answers}/>
        </div>
      </section>
    );
  }
}


export default Question;
