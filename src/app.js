import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, Route, browserHistory } from 'react-router';



const renderApp = () => {
    const Routes = require('./routes.js').default;
    ReactDOM.render(
      <AppContainer>
        <Router history={browserHistory}>
          {Routes}
        </Router>
      </AppContainer>,
      document.getElementById('content')
    );
}
renderApp();

if (module.hot) {
  module.hot.accept('./MaterialBox', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    renderApp();
  });
}