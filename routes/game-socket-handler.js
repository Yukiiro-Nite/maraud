const engine = require('../server/game/engine');
const processKeys = require('../server/game/keyProcessor').processKeys;

exports.config = {
  socketEvents: {
    connection(io, socket) {
      // TODO: create body for user, let everyone know user has joined, send all bodies to new user
      const player = engine.addPlayer(socket.id);
      socket.broadcast.emit('userJoin', {id: socket.id, player: player});
      socket.emit('entities', engine.getEntities());
    },
    keys(io, socket, msg) {
      processKeys({io, id: socket.id, keys: msg, engine});
    },
    move(io, socket, msg) {
      engine.setVelocity(socket.id, msg.direction);
    },
    fire(io, socket, msg) {
      engine.fire(socket.id, msg.direction);
    },
    disconnect(io, socket, msg) {
      // TODO remove user's body, let other users know they have left.
      const player = engine.removePlayer(socket.id);
      io.emit('userLeave', {id: socket.id, player: player});
    }
  }
};
