const users = [];

const addUser = ({id, name, room}) => {
	// clean destructured data
	name = name.trim().toLowerCase();
	room = room.trim().toLowerCase();

	const existingUser = users.find((user) => user.room === room && user.name === name);
	if (existingUser) {
		return {error: 'Username is taken'};
	}

	const user = {
		id: id,
		name: name,
		room: room,
	}

	users.push(user);

	return { user };
}

const removeUser = (id) => {
	const index = users.findIndex( (user) => user.id === id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}

	// alternative
	// users.filter( (user) => user.id !== id);

}

const getUser = (id) => {
	return users.find( user => user.id === id);
}

const getUsersInRoom = (room) => {
	return users.filter( user => user.room === room);
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };