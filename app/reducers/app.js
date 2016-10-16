import { composeReducer } from 'redux-compose-reducer';

const initialState = {
  app: 'default data'
};

export default composeReducer('app', {
}, initialState);
