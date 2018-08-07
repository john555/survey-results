import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import  config from './config';
import data from './fixture';
import App from './App';

describe('<App />', () => {
  const mock = new MockAdapter(axios);

  mock.onGet(config.SURVEY_DATA_URL).reply(200, data)

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });
});
