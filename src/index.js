import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { newGame } from './store/actions/app';
import createStore from './store/create-store';
import App from './container-components/app';
import './index.css';

// createStore function which returns a store object.
//Pass this object to the react-redux Provider component,
//which is rendered at the top of our component tree to ensure that
//while connecting to Redux, store is available to components

const store = createStore();
store.dispatch(newGame());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
