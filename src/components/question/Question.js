import React from 'react';
import PropTypes from 'prop-types';

const Question = props => (
  <section className="question">
    <header className="question__header">
      <h1 className="question__title">{props.question}</h1>
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
