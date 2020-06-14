import { Container, Button, FormGroup, Input } from 'reactstrap'
import fetch from 'isomorphic-unfetch'
import { useState } from 'react'

//import { logFollowees } from '../lib/log-ids'
//logFollowees(db, twitterOptions, '1536987138437182000')
//logFollowers(db, twitter, '1536987138437182000')
//resolveUsers(db, twitter, 'followers', 100, 1900)

const Home = () => {
	const [username, setUsername] = useState('')
	const [first, setFirst] = useState(0)
	const [last, setLast] = useState(0)
	const [cursor, setCursor] = useState(-1)

	const resolveUsers = async () => {
		const response = fetch('/api/resolve-users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: username,
				group: 'followers',
				first: first,
				last: last,
			})
		})
	}

	const logFollowers = async () => {
		const response = fetch('/api/log-graph', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: username,
				group: 'followers',
				cursor: cursor,
			})
		})
	}

	const logFollowees = async () => {
		const response = fetch('/api/log-graph', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: username,
				group: 'followees',
				cursor: cursor,
			})
		})
	}

	return (
		<>
			<Container>
				<div className="mt-5 mb-3">
					<h1>Export Your Twitter Followers</h1>
				</div>
				<div className="mt-3 mb-3">
					<h3>Settings</h3>
					<FormGroup>
						<label>Username</label>
						<Input id="username" value={username} placeholder="Username"
							onChange={(e) => setUsername(e.target.value)} />
					</FormGroup>
					<FormGroup>
						<label>Cursor</label>
						<Input id="cursor" value={cursor} placeholder="Cursor"
							onChange={(e) => setCursor(e.target.value)} />
					</FormGroup>
					<FormGroup>
						<label>First</label>
						<Input id="first" value={first} placeholder="First"
							onChange={(e) => setFirst(e.target.value)} />
					</FormGroup>
					<FormGroup>
						<label>Last</label>
						<Input id="last" value={last} placeholder="Last"
							onChange={(e) => setLast(e.target.value)} />
					</FormGroup>

					<h3>Actions</h3>
					<Button onClick={logFollowers}>
						Log Followers
					</Button>
					{' '}
					<Button onClick={logFollowees}>
						Log Followees
					</Button>
					{' '}
					<Button onClick={resolveUsers}>
						Resolve Users
					</Button>
				</div>
			</Container>
      <style jsx>{`
      `}</style>
		</>
	)
}

export default Home

