const expressInstance = require("express");
const path = require("path");

const app = expressInstance();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

function closeSocket(){
	var clients = {}
	sockets.on('connection', function(socket) {
  	clients[socket.id] = socket;

	socket.on('disconnect', function() {
    delete clients[socket.id];
    	});
	});
}

async function asyncFunc() {
    var msg = await closeSocket(1);
    console.log(msg);
    return msg;
}

app.use(expressInstance.static(path.join(__dirname+"/public")));

io.on("connection", function(socket){
	socket.on("newuser",function(username){
		socket.broadcast.emit("update", username + " has joined the chat!");
	});
	socket.on("exituser",function(username){
		socket.broadcast.emit("update", username + " has left the chat");
	});
	socket.on("chat",function(message){
		socket.broadcast.emit("chat", message);
	});
});
// asyncFunc();

// Runs on local host port 5000
server.listen(5000);