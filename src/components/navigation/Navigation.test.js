import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation';

describe('<Navigation />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Navigation nextButtonClick={()=>{}} previousButtonClick={()=>{}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });  
});
