import React from 'react';
import ReactDOM from 'react-dom';
import QuestionPlaceholder from './QuestionPlaceholder';

describe('<QuestionPlaceholder />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<QuestionPlaceholder QuestionPlaceholder="" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
});
