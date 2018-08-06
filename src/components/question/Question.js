import React from 'react';
import PropTypes from 'prop-types';

const Question = props => (
  <section className="question">
    <header className="question__header">
      <h1 className="question__title">
        <span className="question__numberWrapper">
        <span className="question__number">{props.questionNumber}</span>
          <span className="question__numberLabel">Qtn #</span>
        </span>
        <span className="question__titleText">{props.question}</span>
      </h1>
    </header>
    <div className="question__answers">
      {props.children}
    </div>
  </section>
);

Question.propTypes = {
  question: PropTypes.string.isRequired,
};

export default Question;
