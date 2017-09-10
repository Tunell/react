import React from "react";
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {routerReducer} from "react-router-redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import {resourceFromUrl} from "./materialGetters/materialGettersReducer";
import {loginReducer} from "./Login/loginReducer.js";

const logger = createLogger({level: 'log'});

const appReducer = combineReducers({
	routing: routerReducer,
	user: loginReducer,
	resources: resourceFromUrl
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
}
export { rootReducer }

// Add the reducer to your store on the `routing` key
const store = createStore(rootReducer, compose(
	applyMiddleware(thunk/*, logger*/),
	window.devToolsExtension ? window.devToolsExtension() : f => f
));
export { store };