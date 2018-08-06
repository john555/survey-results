import React from 'react';
import PropTypes from 'prop-types';
import Chart from '../chart/Chart'

const Answer = props => (
  <section className="answer">
    <header className="answer__header">
      <h1 className="answer__title">{props.group}</h1>
    </header>
    <div className="answer__chartWrapper">
      <Chart data={props.data} />
    </div>
  </section>
);

Answer.propTypes = {
  group: PropTypes.string.isRequired,
}

export default Answer;
