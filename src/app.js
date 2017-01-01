import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import { store } from './RootStore.jsx';

const renderApp = () => {
    const Routes = require('./routes.js').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={ store }>
          <Router history={browserHistory}>
            {Routes}
          </Router>
        </Provider>
      </AppContainer>,
      document.getElementById('content')
    );
}
renderApp();

if (module.hot) {
  module.hot.accept('./routes', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    renderApp();
  });
}