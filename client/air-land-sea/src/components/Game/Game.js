import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket

const Game = ({ location }) => {
	const [name, setName] = useState('')
	const [room, setRoom] = useState('')
	const [isReady, setIsReady] = useState(false)

	const ENDPOINT = 'localhost:5000'
	//const ENDPOINT = 'ec2-18-144-161-152.us-west-1.compute.amazonaws.com:5000'

	useEffect(() => {
		const { name, room } = queryString.parse(location.search)
		socket = io(ENDPOINT)
		setName(name)
		setRoom(room)

		socket.emit('join', { name, room }, () => { 
		})

		socket.on('gameReady', info => {
			setIsReady(false)
		})

		return () => {
			socket.emit('disconnect')
			socket.off()
		}

	}, [ENDPOINT, location.search])

	useEffect(() => {
		
		return () => {
			socket.emit('disconnect')
			socket.off()
		}
	}, [])


	return (
		<div className="outerContainer">
			<div className="gameContainer">
				<button disabled={isReady ? false : true}>
					Start Game
				</button>
			</div>
		</div>
	)
}

export default Game