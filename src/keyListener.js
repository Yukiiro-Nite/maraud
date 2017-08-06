// const direction = {
//   right: 0,
//   up: 270 * (Math.PI / 180),
//   left: 180 * (Math.PI / 180),
//   down: 90 * (Math.PI / 180)
// };

const keys = {};

const registerKeyListener = (socket) => {
  document.addEventListener('keydown', (event) => {
    if(!keys[event.code]){
      keys[event.code] = true;
      socket.emit('keys', keys);
    }
    // console.log(event);
    // if(event.keyCode === 87) { // w
    //   socket.emit('move', {radians: direction.up});
    // }
    // if(event.keyCode === 65) { // a
    //   socket.emit('move', {radians: direction.left});
    // }
    // if(event.keyCode === 83) { // s
    //   socket.emit('move', {radians: direction.down});
    // }
    // if(event.keyCode === 68) { // d
    //   socket.emit('move', {radians: direction.right});
    // }
  });
  document.addEventListener('keyup', (event) => {
    if(keys[event.code]) {
      delete keys[event.code];
      socket.emit('keys', keys);
    }
  });
};

export default registerKeyListener;
