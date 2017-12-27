import React from "react";
import ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import {browserHistory, Router} from "react-router";
import {Provider} from "react-redux";

import {store} from "./RootStore.jsx";


const history = browserHistory;

gtag('config', 'UA-56365201-2');
history.listen(location => {
	gtag('config', 'UA-56365201-2', {
		'page_path': location.pathname,
		// Maps 'dimension1' to 'user_id'.
		'custom_map': {'dimension1': 'user_id'}
	});
});

const renderApp = () => {
    const Routes = require('./routes.js').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={ store }>
					<Router history={history}>
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