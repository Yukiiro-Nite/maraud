// had to change line 4391 in matter.js
//  needed to wrap the line in a try catch because node doesn't have HTMLElement
const port = 3007;
const expressStarter = require('express-starter');
const engine = require('./game/engine');

expressStarter.start(port, (express, app, io) => {
  engine.start(io);
});