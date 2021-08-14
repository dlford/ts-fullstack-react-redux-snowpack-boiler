import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import { Provider } from 'react-redux';

import store from '~/store';
import App from './App';

describe('<App>', () => {
  it('renders', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const element = getByText(/API Call Result:/i);
    expect(document.body.contains(element)).to.be.true;
  });
});
