/* ambient.js example */
// this example streams sound data from
// the ambient sensor every 0.5 seconds
var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var WebSocket = require('ws');

// Connect to our ambient sensor.
var ambient = ambientlib.use(tessel.port['A']);

// Open a websocket to our app.
var ws = new WebSocket('ws://awesome-app.com/ambient');
// When the connection is established
ws.on('open', function () {
  setInterval(function () {
    // read some sound level data
    ambient.getSoundLevel(function(err, sdata) {
      if (err) throw err;
      sdata.pipe(ws);
    })
  }, 500); // The readings will happen every .5 seconds
});