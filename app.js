/* Server */
var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(5000, function() {
	console.log('Listening on port 5000!');
});

/* Message Handler */
var userids = [];
var outputControls = [['1','2','3','4']];
var incomingControls = ['W','A','S','D'];

io.sockets.on("connection", function(socket) {
	socket.on('joined',function() {
		// Add the socket id of the new connection to the userids array
		userids.push(socket.id);
		let userid = userids.indexOf(socket.id);
		console.log("*** NEW CONNECTION ***\nSocket ID: " + socket.id + "\nUser ID: " + userid);
		io.to(socket.id).emit('id', userid); // Send index of clientid to client
	});

	socket.on('buttonPress', function(id, button) {
		let controlIndex = incomingControls.indexOf(button);
		console.log(outputControls[id][controlIndex]);
	});
});