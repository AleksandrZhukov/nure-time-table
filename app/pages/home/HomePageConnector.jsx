import React, { Component, PropTypes } from 'react';
import { Connector } from 'react-redux-connector';
import HomePage from './HomePage';

import axios from 'axios';
import sortBy from 'lodash/sortBy';
import drop from 'lodash/drop';
import head from 'lodash/head';

function sortFaculties(faculties) {
  const sorted = sortBy(faculties, 'full_name');
  if (head(sorted).id === 2001) { // put 'Інші' to the last place
    return [...drop(sorted), head(sorted)];
  } else {
    return sorted;
  }
}

export default class HomePageConnector extends Connector {
  static $connection = HomePage;
  static $state = {
    structure: {
      teachers: [],
      groups: []
    }
  };

  static $reducer = HomePageConnector.reduce('app', (state) => ({
    $getTeachersStructure: data => ({...state, structure: { ...state.structure, teachers: sortFaculties(data.university.faculties) } }),
    $getGroupsStructure: data => ({...state, structure: { ...state.structure, groups: sortFaculties(data.university.faculties) } })
  }));

  $expose($state) {
    return {
      teachersStructure: $state.structure.teachers,
      groupsStructure: $state.structure.groups
    };
  }

  $getTeachersStructure() {
    debugger;
    return axios.get('/api/getTeachersStructure')
      .then(response => this.$$getTeachersStructure(response.data));
  }

  $getGroupsStructure() {
    debugger;
    return axios.get('/api/getGroupsStructure')
      .then(response => this.$$getGroupsStructure(response.data));
  }
}
