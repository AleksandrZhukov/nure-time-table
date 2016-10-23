import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reduxLoger from 'redux-logger';

const Middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const logger = reduxLoger({ collapsed: true });
  Middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware.apply(null, Middlewares)(createStore);

export default createStoreWithMiddleware;
