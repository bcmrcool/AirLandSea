import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Join.css'

const Join = () => {
	const [name, setName] = useState('')
	const [room, setRoom] = useState('')

	return (
		<div className="joinOuterContainer">
			<div className="joinInnerContainer">
				<h1 className="heading">Join Room</h1>
				<div><input placeholder="User Name" className="joinInput" type="text" onChange={event => setName(event.target.value)}/></div>
				<div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={event => setRoom(event.target.value)}/></div>
				<Link to={`/game?name=${name}&room=${room}`}>
					<button className="button mt-20" type="submit">Log In</button>
				</Link>
			</div>

		</div>
	)
}

export default Join