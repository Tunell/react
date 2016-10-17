import React from 'react';
import ReactDOM from 'react-dom';
import MaterialBox from './MaterialBox.jsx';
import { AppContainer } from 'react-hot-loader';

ReactDOM.render(
	<AppContainer>
		<MaterialBox url="/api/comments" pollInterval={2000} />
	</AppContainer>,
    document.getElementById('content')
);

if (module.hot) {
  module.hot.accept('./MaterialBox', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./MaterialBox').default;
    ReactDOM.render(
      <AppContainer>
         <NextApp url="/api/comments" pollInterval={2000}/>
      </AppContainer>,
    document.getElementById('content')
    );
  });
}