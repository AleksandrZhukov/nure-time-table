import axios from 'axios';
import { createTypes } from 'redux-compose-reducer';

export const TYPES = createTypes('app', [
  'getTeachersStructure',
  'getGroupsStructure'
]);

export function getTeachersStructure(dispatch) {

  return axios.get('/api/getTeachersStructure')
    .then(response => {
      debugger;
      dispatch({
        type: TYPES.getTeachersStructure,
        res: response.data
      });
      return response.data;
    });
}

export function getGroupsStructure(dispatch) {
  return axios.get('/api/getGroupsStructure')
    .then(response => {
      debugger;
      dispatch({
        type: TYPES.getGroupsStructure,
        res: response.data
      });
      return response.data;
    });
}