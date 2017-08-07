const processMovement = ({id, keys, engine}) => {
  const vector = {x: 0, y: 0};

  keys.up && vector.y--;
  keys.left && vector.x--;
  keys.down && vector.y++;
  keys.right && vector.x++;

  if(vector.x !== 0 || vector.y !== 0) {
    const direction = Math.atan2(vector.y, vector.x);
    engine.setVelocity(id, direction);
  } else {
    engine.removeVelocity(id);
  }
};

const getMovementKeys = ({KeyW, KeyA, KeyS, KeyD}) => ({up:KeyW, left:KeyA, down:KeyS, right:KeyD});

const processKeys = ({id, keys, engine}) => {
  processMovement({id, keys: getMovementKeys(keys), engine});
  keys.Space && engine.fire(id);
};

exports.processKeys = processKeys;
