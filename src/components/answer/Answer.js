import React from 'react';
import Chart from '../chart/Chart'

const Answer = props => (
  <section className="answer">
    <header className="answer__header">
      <h1 className="answer__title">D0a</h1>
    </header>
    <div className="answer__chartWrapper">
      <Chart data={props.data} />
    </div>
  </section>
);

export default Answer;
