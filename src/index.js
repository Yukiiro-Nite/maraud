import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import entities from './reducers/entityReducer';
import registerKeyListeners from './keyListener';
import io from 'socket.io-client';

const store = createStore(combineReducers({
  entities
}));

const socket = io.connect('michaelmarlobryant.me:3007');
socket.on('entities', (msg) => store.dispatch({ type: 'entities', data: msg }));
socket.on('worldUpdate', (msg) => store.dispatch({ type: 'worldUpdate', data: msg }));
socket.on('userJoin', (msg) => store.dispatch({ type: 'userJoin', data: msg }));
socket.on('userLeave', (msg) => store.dispatch({ type: 'userLeave', data: msg }));

registerKeyListeners(socket);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
