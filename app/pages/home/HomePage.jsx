import React, { Component, PropTypes } from 'react';
import { Connection } from 'react-redux-connector';

export default class HomePage extends Connection {
  render() {
    const { teachersStructure, groupsStructure } = this.props;
    return (
      <div>
        <div onClick={ this.$getTeachersStructure }>get teachers structure</div>
        <div onClick={ this.$getGroupsStructure }>get groups structure</div>

        <div className="layout horizontal">
          <div className="ml-20 flex">
            { teachersStructure.length > 0 && teachersStructure.map(f =>
              <div key={ f.id }>{ f.full_name }
                <div className="ml-20">
                  { f.departments.length > 0 && f.departments.map(d =>
                    <div key={ d.id }>{ d.full_name }
                      <div className="ml-20">
                        { d.teachers.length  > 0 && d.teachers.map(t =>
                            <span key={ t.id } className="mr-5">{ t.short_name }</span>
                        )}
                      </div>
                    </div>

                  )}
                </div>
              </div>
            ) }
          </div>
          <div className="flex">
            { groupsStructure.length > 0 && groupsStructure.map(f =>
              <div key={ f.id }>{ f.full_name }
                <div className="ml-20">
                  { f.directions.length > 0 && f.directions.map(d =>
                    <div key={ d.id }>{ d.full_name }
                      <div className="ml-20">
                        { d.groups && d.groups.length > 0 && d.groups.map(g =>
                          <span key={ g.id } className="mr-5">{ g.name }</span>
                        ) }
                        { d.specialities && d.specialities.length > 0 && d.specialities.map(s =>
                          <div key={ s.id }>{ s.full_name }
                            <div className="ml-20">
                              { s.groups && s.groups.length > 0 && s.groups.map(g =>
                                 <span key={ g.id } className="mr-5">{ g.name }</span>
                               ) }
                            </div>
                          </div>
                          )
                        }
                      </div>
                    </div>

                  )}
                </div>
              </div>
            ) }
          </div>
        </div>
      </div>
    )
  }
}
