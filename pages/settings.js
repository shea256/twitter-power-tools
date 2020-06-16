import { Container, Button, FormGroup, Input } from 'reactstrap'
import {
	useTwitterUsername, useDatabase, useTwitterClient, useQuerySettings
} from '../lib/actions'

const Settings = () => {
	const [database, setDatabase] = useDatabase()
	const [twitterUsername, setTwitterUsername] = useTwitterUsername()
	const [twitterClient, setTwitterClient] = useTwitterClient()

	return (
		<>
			<Container>
        <h1 className="mt-5">Settings</h1>
				<div className="mt-5 mb-5">
					<h3>Database Settings</h3>
					<FormGroup>
						<label>PostgreSQL Database String</label>
						<Input id="dbString" value={database.string}
							placeholder="postgres://"
							onChange={(e) => setDatabase({ string: e.target.value })} />
					</FormGroup>
				</div>
				<div className="mt-5 mb-5">
					<h3>Twitter Settings</h3>
					<FormGroup>
						<label>Twitter Username</label>
						<Input id="twitterUsername" value={twitterUsername}
							placeholder="Twitter username"
							onChange={(e) => setTwitterUsername(e.target.value)} />
					</FormGroup>
					<FormGroup>
						<label>Twitter Consumer Key</label>
						<Input id="twitterConsumerKey" value={twitterClient.consumerKey}
							placeholder="xxx"
							onChange={(e) => setTwitterClient({ consumerKey: e.target.value })}
						/>
					</FormGroup>
					<FormGroup>
						<label>Twitter Consumer Secret</label>
						<Input id="twitterConsumerSecret" value={twitterClient.consumerSecret}
							placeholder="xxx"
							onChange={(e) => setTwitterClient({ consumerSecret: e.target.value })}
						/>
					</FormGroup>
					<FormGroup>
						<label>Twitter Access Token</label>
						<Input id="twitterAccessToken" value={twitterClient.accessToken}
							placeholder="xxx"
							onChange={(e) => setTwitterClient({ accessToken: parseInt(e.target.value) })}
						/>
					</FormGroup>
					<FormGroup>
						<label>Twitter Access Token Secret</label>
						<Input id="twitterAccessTokenSecret" value={twitterClient.accessTokenSecret}
							placeholder="xxx"
							onChange={(e) => setTwitterClient({ accessTokenSecret: e.target.value })}
						/>
					</FormGroup>
				</div>
      </Container>
		</>
	)
}

export default Settings
