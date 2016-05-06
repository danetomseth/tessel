/* ambient.js example */
// this example streams sound data from
// the ambient sensor every 0.5 seconds
/*
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
*/

var tessel = require('tessel');
var servolib = require('servo-pca9685'); 

var servo = servolib.use(tessel.port['A']);

var servo1 = 1; // We have a servo plugged in at position 1

servo.on('ready', function () {
  var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).

  //  Set the minimum and maximum duty cycle for servo 1.
  //  If the servo doesn't move to its full extent or stalls out
  //  and gets hot, try tuning these values (0.05 and 0.12).
  //  Moving them towards each other = less movement range
  //  Moving them apart = more range, more likely to stall and burn out
  servo.configure(servo1, 0.05, 0.12, function () {
    setInterval(function () {
      console.log('Position (in range 0-1):', position);
      //  Set servo #1 to position pos.
      servo.move(servo1, position);

      // Increment by 10% (~18 deg for a normal servo)
      position += 0.1;
      if (position > 1) {
        position = 0; // Reset servo position
      }
    }, 500); // Every 500 milliseconds
  });
});


