import { composeReducer } from 'redux-compose-reducer';
import sortBy from 'lodash/sortBy';
import drop from 'lodash/drop';
import head from 'lodash/head';

const initialState = {
  app: 'default data',
  structure: {
    teachers: [],
    groups: []
  }
};

function sortFaculties(faculties) {
  const sorted = sortBy(faculties, 'full_name');
  if (head(sorted).id === 2001) { // put 'Інші' to the last place
    return [...drop(sorted), head(sorted)];
  } else {
    return sorted;
  }
}

function getTeachersStructure(state, action) {
  return { ...state, structure: { ...state.structure, teachers: sortFaculties(action.res.university.faculties) } }
}

function getGroupsStructure(state, action) {
  return { ...state, structure: { ...state.structure, groups: sortFaculties(action.res.university.faculties) } }
}

export default composeReducer('app', {
  getTeachersStructure,
  getGroupsStructure
}, initialState);
