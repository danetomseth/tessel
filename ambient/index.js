var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var http = require('http');
var servolib = require('servo-pca9685');
var ambient = ambientlib.use(tessel.port['A']);
var servo = servolib.use(tessel.port['B']);
var servo1 = 1; 

var servoReady = false;
var deviceOn = false;
var zeroSet = false;
var clap = false;
var lastSound = 0;
var clapSound = 0;
var nextSound = 0;
var soundArray = [0,0,0];

// ambient.on('ready', function() {
// 	console.log('Ambient Ready')
//     servo.on('ready', function() {
//         servoReady = true;
//         console.log('Servo Ready')
//     });
//     var position = 0;

//     setInterval(function() {
//         ambient.getSoundLevel(function(err, sounddata) {
//             servo.configure(servo1, 0.05, 0.12, function() {
//             	if(!zeroSet) {
//                     servo.move(servo1, 0);
//                     position = 0; 
//                     zeroSet = true;
//             	}
//                 if (err) throw err;
//                 if(sounddata > 0.3) {
//                 	soundArray.push(sounddata)
//                 	soundArray.shift();
//                 	if(soundArray[0] < soundArray[1] && soundArray[1] > soundArray[2]) {
//                 		soundArray = [0,0,0];
//                 		clap = true;
//                 	}
//                 	console.log('Array', soundArray)
//                 }

//                 if (clap) {
//                     var servoInt;
//                     if (!deviceOn) {
//                         deviceOn = true;
//                         servoInt = setInterval(function() {
//                             if (position > 0.2) {
//                                 clearInterval(servoInt);
//                                 zeroSet = false; 
//                                 deviceOn = false; 
//                             }
//                             servo.move(servo1, position);
//                             position += 0.05;
//                         }, 500)
//                     }
//                 }
//             });
//         });
//     }, 100); 

// });

// ambient.on('error', function(err) {
//     console.log(err);
// });


ambient.on('ready', function() {
	console.log('Ambient Ready')
    servo.on('ready', function() {
        servoReady = true;
        console.log('Servo Ready')
    });
    var position = 0;

    setInterval(function() {
    	ambient.getLightLevel( function(err, lightdata) {
    		servo.configure(servo1, 0.05, 0.12, function() {
            	console.log('light data', lightdata);
            	if(!zeroSet) {
                    servo.move(servo1, 0);
                    position = 0; 
                    zeroSet = true;
            	}
                if (lightdata > 0.38) {
                	console.log('moving!!')
                    var servoInt;
                    if (!deviceOn) {
                        deviceOn = true;
                        servoInt = setInterval(function() {
                            if (position > 0.2) {
                                clearInterval(servoInt);
                                zeroSet = false; 
                                deviceOn = false; 
                            }
                            servo.move(servo1, position);
                            position += 0.05;
                        }, 500)
                    }
                }
            });
    	})
        // ambient.getSoundLevel(function(err, sounddata) {
        //     servo.configure(servo1, 0.05, 0.12, function() {
        //     	if(!zeroSet) {
        //             servo.move(servo1, 0);
        //             position = 0; 
        //             zeroSet = true;
        //     	}
        //         if (err) throw err;
        //         if(sounddata > .3) {
        //         	console.log(sounddata);
        //         }
        //         if (sounddata > 0.3) {
        //             var servoInt;
        //             if (!deviceOn) {
        //                 deviceOn = true;
        //                 servoInt = setInterval(function() {
        //                     if (position > 0.2) {
        //                         clearInterval(servoInt);
        //                         zeroSet = false; 
        //                         deviceOn = false; 
        //                     }
        //                     servo.move(servo1, position);
        //                     position += 0.05;
        //                 }, 500)
        //             }
        //         }
        //     });
        // });
    }, 100); 

});

ambient.on('error', function(err) {
    console.log(err);
});
