import React from 'react';

const Entity = (props) => {
  const {id, position, angle, label, width, height} = props.body;
  return (
    <div
      className={ label }
      style={{
        left: `${position.x - width / 2}px`,
        top: `${position.y - height / 2}px`,
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${angle}rad)`
      }}
    ></div>
  );
};

export default Entity;