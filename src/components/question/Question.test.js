import React from 'react';
import ReactDOM from 'react-dom';
import Question from './Question';

describe('<Question />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const data = {
      question: '',
      answers: [],
    };
    ReactDOM.render(<Question data={data} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
});
