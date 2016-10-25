import React, { Component, PropTypes } from 'react';
import { Connector } from 'react-redux-connector';
import HomePage from './HomePage';

import axios from 'axios';
import sortBy from 'lodash/sortBy';
import drop from 'lodash/drop';
import head from 'lodash/head';
import moment from 'moment';

function sortFaculties(faculties) {
  const sorted = sortBy(faculties, 'full_name');
  if (head(sorted).id === 2001) { // put 'Інші' to the last place
    return [...drop(sorted), head(sorted)];
  } else {
    return sorted;
  }
}

function shouldUpdateStructure(type) {
  const currentTime = moment();
  const lastUpdate = localStorage[`lastUpdated${type}Structure`];
  return !lastUpdate || !localStorage[`${type}Structure`] || currentTime.diff(moment(lastUpdate), 'hours') > 24;
}

function setLastUpdateTo(type, data) {
  localStorage.setItem(`lastUpdated${type}Structure`, new Date().toISOString());
  localStorage.setItem(`${type}Structure`, JSON.stringify(data));
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

  $getTeachersStructure(forceUpdate = false) {
    debugger;
    if (forceUpdate || shouldUpdateStructure('Teachers')) {
      return axios.get('/api/getTeachersStructure')
        .then(response => {
          setLastUpdateTo('Teachers', response.data);
          this.$$getTeachersStructure(response.data);
        });
    } else {
      const data = JSON.parse(localStorage.TeachersStructure);
      this.$$getTeachersStructure(data);
    }
  }

  $getGroupsStructure(forceUpdate = false) {
    debugger;
    if (forceUpdate || shouldUpdateStructure('Groups')) {
      return axios.get('/api/getGroupsStructure')
        .then(response => {
          setLastUpdateTo('Groups', response.data);
          this.$$getGroupsStructure(response.data);
        });
    } else {
      const data = JSON.parse(localStorage.GroupsStructure);
      this.$$getGroupsStructure(data);
    }
  }
}
