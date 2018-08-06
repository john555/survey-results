import React from 'react';
import ReactDOM from 'react-dom';
import Answer from './Answer';

describe('<Answer />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const data = [];
    ReactDOM.render(<Answer group={''} data={data} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
});
