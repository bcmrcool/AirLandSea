const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)



io.on('connection', socket => {
	socket.on('join', ({ name, room }, callback) => {

		//Upon join, add a user to a room
		const { error, user } = addUser({id: socket.id, name, room})
		if (error) return callback(error)
		//send a message to the user who just joined
		//socket.emit('message', { user: 'admin', text: `${user.name}, welcome to ${user.room}` })

		//socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined`})
		socket.join(user.room)
		console.log(getUsersInRoom(user.room))
		console.log(room)
		if (getUsersInRoom.length > 1){
			io.to(room).emit('gameReady', { users: getUsersInRoom(user.room)})
		}
		//io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})

		callback()
	})

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id)
		io.to(user.room).emit('message', {user: user.name, text: message})
		//io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
		callback()
	})

	socket.on('disconnect', () => {
		const user = removeUser(socket.id)
		if(user){
			io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left`})
			io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
		}
	})
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))