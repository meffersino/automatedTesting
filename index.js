var five = require('johnny-five'),
	servoA, servoB, servoC,
	positionA, positionB, positionC,
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

function tap() {
	servoA.to(positionA + 10);
	servoB.to(positionB + 10);
	servoC.to(positionC + 10);
	setTimeout(myFunction(), 100);
	servoA.to(positionA);
	servoB.to(positionB);
	servoC.to(positionC);
}

console.log("Waiting for device to connect...");