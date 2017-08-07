import React, { Component } from 'react';
import { connect } from 'react-redux';
import Entity from './Entity';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        { 
          this.props.entities.map((body, index) =>
            <Entity key={index} body={ body } />
          )
        }
      </div>
    );
  }
}

export default connect((state) => ({entities: state.entities}))(App);
