import React from 'react';
import ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from 'routes';
import configureStore from 'store';
import 'normalize.css';
import 'styles/app.css';

const store = configureStore();

ReactDom.render(
  <Provider store={ store }>
    <Router children={ routes } history={ browserHistory } />
  </Provider>,
  document.getElementById('app')
);
