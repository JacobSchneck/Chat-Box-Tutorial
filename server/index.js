const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const { Console } = require('console');

const {addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const corsOption={
	cors: true,
	origins: ["http://localhost:3000"],
}

const app = express();
const server = http.createServer(app);
// const io = socketio(server, {
// 	cors: {
// 		origin: '*',
// 	}
// });
const io = socketio(server, corsOption);

// app.use(cors());
app.use(router);

io.on('connection', (socket) => {
	console.log(`We have a new connection!!!`);

	socket.on('join', ( {name, room }, callback ) => {
		const { error, user } = addUser({
			id: socket.id, // id of the instance of socket 
			name: name,
			room: room,
		});

		// error handling
		if (error) {
			return callback(error);
		}

		socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
		socket.broadcast.to(user.room).emit('message', { user : 'admin', text: `${user.name}, has joined`});

		socket.join(user.room);
		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);
		io.to(user.room).emit('message', {user: user.name, text: message}); 
		callback();
	});

	socket.on('disconnect', () => {
		// console.log("User has left :(");
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left}`});
		}
	});
})

server.listen(PORT, () => { 
	console.log(`Server has started on port ${PORT}`);
});