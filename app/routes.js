import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { MainLayout } from 'layouts';
import * as pages from 'pages';

export default (
  <Route name="app" component={ MainLayout } path="/">
    <IndexRoute component={ pages.HomePage } />
  </Route>
);
