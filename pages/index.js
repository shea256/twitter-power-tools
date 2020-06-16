import { Container, Button, FormGroup, Input } from 'reactstrap'
import fetch from 'isomorphic-unfetch'
import { useQuerySettings } from '../lib/actions'

const resolveUsers = async (db, twitterClient, group, limit, offset) => {
	const response = fetch('/api/resolve-users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			dbString: db.string,
			twitterClient,
			group,
			limit,
			offset
		})
	})
	return response
}

const logGraph = async (db, twitterClient, twitterUsername, group, cursor) => {
	const response = fetch('/api/log-graph', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			dbString: db.string,
			twitterClient,
			twitterUsername,
			group,
			cursor,
		})
	})
	return response
}

const Home = () => {
	const [querySettings, setQuerySettings] = useQuerySettings()

	return (
		<>
			<Container>
				<h1 className="mt-5">Export Your Twitter Followers</h1>
				<div className="mt-5 mb-5">
					<h3>Exporting</h3>
					<div className="mb-3 mt-3">
						<Button onClick={() => {
							logGraph(database, twitterClient, twitterUsername, 'followers', cursor)
						}}>
							Log Follower ID's
						</Button>
						{' '}
						<Button onClick={() => {
							logGraph(database, twitterClient, twitterUsername, 'followees', cursor)
						}}>
							Log Followee ID's
						</Button>
					</div>
					<div className="mb-3 mt-3">
						<FormGroup>
							<label>Cursor</label>
							<Input id="cursor" value={querySettings.cursor} placeholder="Cursor"
								onChange={(e) => setQuerySettings({ cursor: parseInt(e.target.value) })}
								type="number" />
						</FormGroup>
					</div>
				</div>
				<div className="mt-5 mb-5">
					<h3>Lookups</h3>
					<div className="mb-3 mt-3">
						<Button onClick={() => {
							resolveUsers(database, twitterClient, 'followers', querySettings.limit, querySettings.offset)
						}}>
							Lookup Followers
						</Button>
						{' '}
						<Button onClick={() => {
							resolveUsers(database, twitterClient, 'followees', querySettings.limit, querySettings.offset)
						}}>
							Lookup Followees
						</Button>
					</div>
					<div className="mb-3 mt-3">
						<FormGroup>
							<label>Limit</label>
							<Input id="limit" value={querySettings.limit} placeholder="Limit"
								onChange={(e) => setQuerySettings({ limit: parseInt(e.target.value) })}
								type="number" />
						</FormGroup>
						<FormGroup>
							<label>Offset</label>
							<Input id="offset" value={querySettings.offset} placeholder="Offset"
								onChange={(e) => setQuerySettings({ offset: parseInt(e.target.value) })}
								type="number" />
						</FormGroup>
					</div>
				</div>
				<div className="mt-5 mb-5">
					<h3>Messaging</h3>
					<Button onClick={() => {
						messageFollowers(database, twitterClient, twitterUsername, cursor)
					}}>
						Message Followers
					</Button>
				</div>
			</Container>
      <style jsx>{`
      `}</style>
		</>
	)
}

export default Home
