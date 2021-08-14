import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Global } from '@emotion/react';

import globalCss from '~/styled/global';

import App from '~/App';
import store from '~/store';
import { isProduction } from '~/constants';

ReactDOM.render(
  <React.StrictMode>
    <Global styles={globalCss} />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (!isProduction && import.meta.hot) {
  import.meta.hot.accept();
}
