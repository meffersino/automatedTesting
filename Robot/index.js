var five = require('johnny-five'),
	ws = require('ws'),
	ik = require("./ik"),
  sleep = require('sleep'),
	board = new five.Board(),
  servo1,servo2,servo3;

//var server = new ws("ws://127.0.0.1:8080/");


board.on("ready", function() {
	//server.send("Board connected");
	servo1 = new five.Servo({
		pin: 12,
		range: [0,90],
		startAt: 30
	});
	servo2 = new five.Servo({
		pin: 10,
		range: [0,90],
		startAt: 30
	});
	servo3 = new five.Servo({
		pin: 11,
		range: [0,90],
		startAt: 30
	});
	position1 = 30;
	position2 = 30;
	position3 = 30;

  allServos = function(position) {
      sleep.msleep(500);
      servo1.to(position);
      servo2.to(position);
      servo3.to(position);
      position1,position2,position3 = position;
      
  }

	tap = function() {
	allServos(position1+10);
  
	//setTimeout(myFunction(), 100);
	allServos(position1-10);
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

  //server.send("Robert ready");
});

/*NOT MY CODE*/

Number.prototype.map = function ( in_min , in_max , out_min , out_max ) {
  console.log("THIS: "+this);
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
  console.log(angles[1]);
  console.log(angles[1].map(0,90,8,90));
  servo1.to((angles[1]).map( 0 , 90 , 8 , 90 ));
  servo2.to((angles[2]).map( 0 , 90 , 8 , 90 ));
  servo3.to((angles[3]).map( 0 , 90 , 8 , 90 ));
  console.log(angles);

  console.log(angles[1].map(0,90,8,90));
}


position = function() {
  return ik.forward(servo1.last.degrees, servo2.last.degrees, servo3.last.degrees);
}

/*MY CODE AGAIN*/

moveTo = function(x,y,z) {
  var tempZ = z+20;
  setTimeout(function(){ go(x,y,tempZ);}, 0);
  setTimeout(function(){ go(x,y,z);}, 500);
}

home = function() {
  setTimeout(function(){ go(0,0,-140);}, 0);
}

disconnect =function() {
  moveTo(-20,-75,-165);
}


// server.onopen = function() {
//     console.log("Opened!");
//     server.send("index.js connected");
// };

// server.onmessage = function (evt) {
//     var strArray = [];
//     var func = evt.data.toString();
//     var tempString = "";
//     for(var i = 0;i<func.length;i++) {
      
//       //if(!func.charAt(i) === "*") {
//       if(!(/[*]/.test(func.charAt(i)))){
//         tempString += func.charAt(i);
//       } else {
//         strArray[strArray.length] = tempString;
//         tempString = "";
//       }
      
//     }
    
//     if(strArray[0] == "move") {
//         go(parseInt(strArray[1]),parseInt(strArray[2]),parseInt(strArray[3]));
//     } else if(strArray[0] == "tap") {
//         //tap();
//     } else if(strArray[0] == "disconnect") {
//        // disconnect();
//     } 
//     console.log("Message: " + evt.data);
// };

// server.onclose = function() {
//     console.log("Robert Left");
// };

// server.onerror = function(err) {
//     console.log("Error: " + err);
// };

console.log("Waiting for device to connect...");
var input = 50;

testArray = new Array(input);



console.log("Test 2: "+rotate(30,60));
console.log("Test 3: "+reflect(40,50));
console.log("Test 4: "+sin(30));
console.log("Test 5: "+cos(60));
//console.log("Test 1: "+testArray[0].map(0,100,20,90));