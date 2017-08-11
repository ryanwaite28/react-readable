import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

import * as reducers from './reducers'
import Root from './root'

import { createStore } from 'redux'

import { combineReducers } from 'redux'

// const logger = store => next => action => {
//   console.group(action.type)
//   console.info('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   console.groupEnd(action.type)
//   return result
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const Reducers = combineReducers({
  ...reducers,
});

const store = createStore(
  Reducers
  // composeEnhancers(applyMiddleware(logger))
)
// console.log('Store Object', store);
// console.log('Store Data', store.getState());

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)

registerServiceWorker()
