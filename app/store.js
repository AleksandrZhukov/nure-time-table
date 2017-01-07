import { createStore, applyMiddleware } from 'redux';
import reduxLoger from 'redux-logger';

const middlewares = [];

if (process.env.NODE_ENV !== 'production') {
  const logger = reduxLoger({ collapsed: true });
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware.apply(null, middlewares)(createStore);

export default createStoreWithMiddleware;
