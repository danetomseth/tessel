/* ambient.js example */
// this example streams sound data from
// the ambient sensor every 0.5 seconds

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var http = require('http');
var servolib = require('servo-pca9685');
var ambient = ambientlib.use(tessel.port['A']);

var servo = servolib.use(tessel.port['B']);
var servo1 = 1; // We have a servo plugged in at position 1


var servoReady = false;

// Connect to our ambient sensor.


ambient.on('ready', function() {

 setInterval(function() {
        ambient.getSoundLevel(function(err, sounddata) {
            if (err) throw err;
            if (sounddata > 0.2) {
                if (servoReady) {
                    console.log("Sound Level:", sounddata.toFixed(8));
                    //turnOn();
                }
            }
            console.log('quiet');
        });
    }, 100); // The readings will happen every .5 seconds



});




servo.on('ready', function() {
	servoReady = true;
});

ambient.on('error', function(err) {
    console.log(err);
});

function turnOn() {
     var position = 0; //  Target position of the servo between 0 (min) and 1 (max).
    //  Moving them apart = more range, more likely to stall and burn out
    servo.configure(servo1, 0.05, 0.12, function() {
        //  Set servo #1 to position pos.
   		servo.move(servo1, 0.5);
        //readAmbient();
    });
    console.log('Move???');
}



   



// servo.on('ready', function () {
//   var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).
//   //  Moving them apart = more range, more likely to stall and burn out
//   servo.configure(servo1, 0.05, 0.12, function () {
//     setInterval(function () {
//       console.log('Position (in range 0-1):', position);
//       //  Set servo #1 to position pos.
//       servo.move(servo1, position);

//       // Increment by 10% (~18 deg for a normal servo)
//       position += 0.1;
//       if (position > 1) {
//         position = 0; // Reset servo position
//       }
//     }, 500); // Every 500 milliseconds
//   });
// });