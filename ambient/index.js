/* ambient.js example */
// this example streams sound data from
// the ambient sensor every 0.5 seconds
var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var WebSocket = require('ws');
var http = require('http');

// Connect to our ambient sensor.
var ambient = ambientlib.use(tessel.port['B']);


// Open a websocket to our app.
//var ws = new WebSocket('ws://awesome-app.com/ambient');
ambient.on('ready', function () {
 // Get points of light and sound data.
  setInterval( function () {
    ambient.getSoundLevel( function(err, sounddata) {
        if (err) throw err;
        if(sounddata > 0.15) {
        	console.log("Sound Level:", sounddata.toFixed(8));
        }
        else {
        	console.log(sounddata.toFixed(8));
        }
        
      });
  }, 100); // The readings will happen every .5 seconds
});


ambient.on('error', function (err) {
  console.log(err);
});

// http.createServer(function(req, res){
//     res.writeHead(200)
//     res.end('Hello');
// }).listen(1337)


// // When the connection is established
// ws.on('open', function () {
//   setInterval(function () {
//     // read some sound level data
//     ambient.getSoundLevel(function(err, sdata) {
//       if (err) throw err;
//       sdata.pipe(ws);
//     })
//   }, 500); // The readings will happen every .5 seconds
// });
