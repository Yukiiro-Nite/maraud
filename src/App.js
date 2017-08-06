import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        {
          this.props.entities.map(({id, position, angle, bounds, label}, index) =>
            <div
              key={ index }
              className={ label }
              style={{
                left: `${bounds.min.x}px`,
                top: `${bounds.min.y}px`,
                width: `${bounds.max.x - bounds.min.x}px`,
                height: `${bounds.max.y - bounds.min.y}px`,
                transform: `rotate(${angle}rad)`
              }}
            ></div>
          )
        }
      </div>
    );
  }
}

export default connect((state) => ({entities: state.entities}))(App);
