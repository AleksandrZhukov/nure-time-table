import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class HomePage extends Component {

  render() {
    return (
      <div>home page</div>
    )
  }
}

export default connect()(HomePage);
