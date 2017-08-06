const FPS = 30;
const Matter = require('matter-js');
const pastThreshold = require('../utils').pastThreshold;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const engine = Engine.create();

let intervalId;
let players = {};
let previousPositions = {};
let io;

const boxA = Bodies.rectangle(400, 200, 80, 80, {frictionAir: 0.05});
const boxB = Bodies.rectangle(480, 200, 80, 80, {frictionAir: 0.05});
const ground = Bodies.rectangle(400, 610, 400, 60, { isStatic: true });

engine.world.gravity = {x: 0, y: 0, scale: 0.001};
World.add(engine.world, [
  boxA,
  boxB,
  ground,
  Bodies.rectangle(480, 200, 80, 80, {frictionAir: 0.05}),
  Bodies.rectangle(480, 200, 80, 80, {frictionAir: 0.05}),
  Bodies.rectangle(480, 200, 80, 80, {frictionAir: 0.05})
]);

Body.setVelocity(boxA, {x:20, y:10});
// Body.setAngle(boxA, 1);
// console.log(boxA);

const objectifyBody = ({id, position, angle, bounds, label}) => ({id, position, angle, bounds, label});

const updatePlayers = () => {
  Object.keys(players)
    .map(key => players[key])
    .forEach( player => {
      const velocity = constructVelocity(player);
      Body.setVelocity(player.body, {x: velocity.x, y: velocity.y});
      //velocity.direction !== NaN && Body.setAngle(player.body, velocity.direction);
    })
};

const sendWorldUpdate = () => {
  let movers = engine.world.bodies
    .filter( body => {
      if(pastThreshold(previousPositions[body.id], body.position, 0.001)) {
        previousPositions[body.id] = Object.assign({}, body.position);
        return true;
      }
      return false;
    })
    .map(objectifyBody);

  if(movers.length > 0) {
    io.emit('worldUpdate', {entities: movers});
  }
};

const updateEngine = () => {
  engine.world.bodies.forEach(body => {
    if(!previousPositions[body.id]) {
      previousPositions[body.id] = Object.assign({},body.positionPrev);
    }
  });

  updatePlayers();

  Engine.update(engine, 1000/FPS);

  sendWorldUpdate();
};

const constructVelocity = (player) => {
  let velX = player.velocity.x * player.ship.acceleration + player.body.velocity.x;
  let velY = player.velocity.y * player.ship.acceleration + player.body.velocity.y;
  let direction = Math.atan(velY / velX);

  return {
    x: velX,
    y: velY,
    direction
  }
};

exports.start = (socketIo) => {
  io = socketIo;
  intervalId = setInterval(updateEngine, 1000/FPS)
};

exports.stop = () => clearInterval(intervalId);

exports.addPlayer = (id) => {
  players[id] = {
    body: Bodies.circle(100, 100, 50, {frictionAir: 0.05}),
    velocity: {x: 0, y: 0},
    ship: {
      acceleration: 2
    }
  };
  World.add(engine.world, players[id].body);
  return objectifyBody(players[id].body);
};

exports.getEntities = () => {
  return engine.world.bodies.map(objectifyBody);
};

exports.removePlayer = (id) => {
  const player = players[id].body;
  World.remove(engine.world, player);
  delete players[id];
  return objectifyBody(player);
};

exports.setVelocity = (id, direction) => {
  players[id].velocity.x = Math.cos(direction);
  players[id].velocity.y = Math.sin(direction);
};

exports.removeVelocity = (id) => {
  players[id].velocity.x = 0;
  players[id].velocity.y = 0;
};