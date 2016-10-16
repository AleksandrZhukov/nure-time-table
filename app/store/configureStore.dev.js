// Development env only
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reduxLoger from 'redux-logger';
import rootReducer from '../reducers';

const logger = reduxLoger({ collapsed: true });

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
