import React from 'react';
import ReactDom from 'react-dom';
import { Router,Route, IndexRoute, browserHistory } from 'react-router';
import { Reductor } from 'react-redux-connector';
import createStore from './store.js';
import 'normalize.css';
import 'styles/app.css';

import { MainLayout } from 'layouts';
import { HomePage } from 'pages';

ReactDom.render(
  <Reductor createStore={ createStore }>
    <Router history={ browserHistory }>
      <Route name="app" component={ MainLayout } path="/">
        <IndexRoute component={ HomePage } />
      </Route>
    </Router>
  </Reductor>,
  document.getElementById('app')
);
