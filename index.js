var five = require('johnny-five'),
	servoA, servoB, servoC,
	board = new five.Board();

board.on("ready", function() {
	servoA = new five.Servo({
		pin: 10,
		range: [1,180],
		startAt: 60
	});
	servoB = new five.Servo({
		pin: 11,
		range: [1,180],
		startAt: 60
	});
	ServoC = new five.Servo({
		pin: 12,
		range: [1,180],
		startAt: 60
	});
});

console.log("Waiting for device to connect...");