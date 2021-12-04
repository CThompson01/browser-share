// Initalize the canvas
var Network = {
	socket: io(),
	buttonPress: function(id, button) {
		Network.socket.emit('buttonPress', id, button);
	}
}

/* Variables */
var userid;

/* Server retrieving methods */
Network.socket.on('id', function(localId) {
	userid = localId;
	console.log(localId);
});

/* Helper Methods */
window.onload = function() {
	Network.socket.emit('joined');
}

function sendButtonPress(button) {
	Network.buttonPress(userid, button);
}

/* Event Handlers */
document.addEventListener("keydown", function(e){
	// If more users than allowed try to join, don't do anything
	if (userid >= 1)
		return;

	var kc = e.keyCode;
	if (kc == 87) {
		sendButtonPress('W');
	}
}, false);