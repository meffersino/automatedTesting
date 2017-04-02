var five = require('johnny-five'),
	ws = require('ws'),
	ik = require("./ik"),
	board = new five.Board();

var server = new ws("ws://127.0.0.1:8080/");


board.on("ready", function() {
	server.send("Board connected");
	servo1 = new five.Servo({
		pin: 12,
		range: [0,90],
		startAt: 60
	});
	servo2 = new five.Servo({
		pin: 10,
		range: [0,90],
		startAt: 60
	});
	servo3 = new five.Servo({
		pin: 11,
		range: [0,90],
		startAt: 60
	});
	position1 = 45;
	position2 = 45;
	position3 = 45;

	tap = function() {
	servo1.to(position1 + 10);
	servo2.to(position2 + 10);
	servo3.to(position3 + 10);
	//setTimeout(myFunction(), 100);
	servo1.to(position1-10);
	servo2.to(position2-10);
	servo3.to(position3-10);
	}

	allServos = function(position) {
    	servo1.to(position);
    	servo2.to(position);
    	servo3.to(position);
    	position1,position2,position3 = position;
    }

	board.repl.inject({
      servo1: servo1,
      s1: servo1,
      servo2: servo2,
      s2: servo2,
      servo3: servo3,
      s3: servo3,
      move: allServos,
      tap: tap
    });
});



server.onopen = function() {
    console.log("Opened!");
    server.send("Robert connected");
};

server.onmessage = function (evt) {
    console.log("Message: " + evt.data);
};

server.onclose = function() {
    console.log("Robert Left");
};

server.onerror = function(err) {
    console.log("Error: " + err);
};

console.log("Waiting for device to connect...");



/*NOT MY CODE*/

Number.prototype.map = function ( in_min , in_max , out_min , out_max ) {
  return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
}

rotate = function(x,y) {
    var theta = -60;
    x1 = x * cos(theta) - y * sin(theta);
    y1 = y * cos(theta) + x * sin(theta);
    return [x1,y1]
}

reflect = function(x,y) {
    var theta = 0;
    x1 = x;
    y1 = x * sin(2*theta) - y * cos(2*theta);
    return [x1,y1]
}


// A sine function for working with degrees, not radians
sin = function(degree) {
    return Math.sin(Math.PI * (degree/180));
}

// A cosine function for working with degrees, not radians
cos = function(degree) {
    return Math.cos(Math.PI * (degree/180));
}


// TODO: pull out map values to config file or some other solution.
go = function(x, y, z) {
  reflected = reflect(x,y);
  rotated = rotate(reflected[0],reflected[1]);

  angles = ik.inverse(rotated[0], rotated[1], z);
  servo1.to((angles[1]).map( 0 , 90 , 8 , 90 ));
  servo2.to((angles[2]).map( 0 , 90 , 8 , 90 ));
  servo3.to((angles[3]).map( 0 , 90 , 8 , 90 ));
  console.log(angles);
}

position = function() {
  return ik.forward(servo1.last.degrees, servo2.last.degrees, servo3.last.degrees);
}