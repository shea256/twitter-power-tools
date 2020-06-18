import { Container, Button, FormGroup, Input } from 'reactstrap'
import fetch from 'isomorphic-unfetch'
import { connect } from 'react-redux'
import useSWR from 'swr'
import Link from 'next/link'
import { useQuerySettings } from '../lib/actions'
import { dbGraphFetcher } from '../lib/fetchers'

const resolveUsers = async (db, twitterClient, group, limit, offset, count) => {
	try {
		const response = await fetch('/api/resolve-users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				db,
				twitterClient,
				group,
				limit,
				offset,
				count
			})
		})
		console.log(response)
		return response
	} catch(e) {
		console.error(e)
	}
}

const logGraph = async (db, twitterClient, twitterUsername, group, cursor) => {
	try {
		const response = await fetch('/api/log-graph', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				db,
				twitterClient,
				twitterUsername,
				group,
				cursor
			})
		})
		.then(r => r.json())
		console.log(response)
		return response
	} catch (e) {
		console.error(e)
	}
}

const Home = ({ database, twitterClient, twitterUsername }) => {
	const [querySettings, setQuerySettings] = useQuerySettings()

	const { data: followers, followersError } = useSWR(
    ['/api/query-graph', database.string, twitterClient, 'followers', 100, 0],
    dbGraphFetcher
	)
	const { data: followees, followeesError } = useSWR(
    ['/api/query-graph', database.string, twitterClient, 'followees', 100, 0],
    dbGraphFetcher
	)

	const followersCount = followers && followers.count ? parseInt(followers.count) : 0
	const followersResolvedCount = followers && followers.resolvedCount ? parseInt(followers.resolvedCount) : 0
	const followeesCount = followees && followees.count ? parseInt(followees.count) : 0
	const followeesResolvedCount = followees && followees.resolvedCount ? parseInt(followees.resolvedCount) : 0

	return (
		<>
			<Container>
				<h1 className="mt-5 text-center">Export Your Twitter Followers</h1>
				<div className="mt-5 mb-5">
					<h3>Instructions</h3>
					<ol>
						<li>
							Go to the <Link href="/settings"><a>settings page</a></Link>
						</li>
						<li>
							Create a Twitter app and enter in your Twitter API credentials
						</li>
						<li>
							Create a postgresql database and enter your database settings
						</li>
						<li>
							Return to the home page
						</li>
						<li>
							Click the "Log Follower ID's" button to start logging your Twitter followers - don't close or refresh the page for at least a minute
						</li>
						<li>
							Click the "Lookup Follower Profiles" button to start looking up the profiles of your Twitter followers - don't close or refresh the page for at least a minute
						</li>
						<li>
							Repeat the previous two steps for your followees
						</li>
						<li>
							View your followers and followees on their respective pages and click the "Message" button to send a direct message to a user or a group of users
						</li>
					</ol>
				</div>
				<div className="mt-5 mb-5">
					<h3>Stats</h3>
					<div className="card-columns">
						<div className="card text-white bg-dark mb-3">
							<div className="card-header">Follower ID's logged</div>
							<div className="card-body">
								<h4 className="card-title">
									{followersCount.toLocaleString()}
								</h4>
							</div>
						</div>
						<div className="card text-white bg-dark mb-3">
							<div className="card-header">Follower profiles logged</div>
							<div className="card-body">
								<h4 className="card-title">
									{followeesCount.toLocaleString()}
								</h4>
							</div>
						</div>
						<div className="card text-white bg-dark mb-3">
							<div className="card-header">Followee ID's logged</div>
							<div className="card-body">
								<h4 className="card-title">
									{followersResolvedCount.toLocaleString()}
								</h4>
							</div>
						</div>
						<div className="card text-white bg-dark mb-3">
							<div className="card-header">Followee profiles logged</div>
							<div className="card-body">
								<h4 className="card-title">
									{followeesResolvedCount.toLocaleString()}
								</h4>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-5 mb-5">
					<h3>List Building</h3>
					<div className="mb-3 mt-3">
						<Button color="primary" onClick={() => {
							logGraph(database, twitterClient, twitterUsername, 'followers', querySettings.cursor)
						}}>
							Log Follower ID's
						</Button>
						{' '}
						<Button color="primary" onClick={() => {
							logGraph(database, twitterClient, twitterUsername, 'followees', querySettings.cursor)
						}}>
							Log Followee ID's
						</Button>
					</div>
					{/*<div className="mb-3 mt-3">
						<FormGroup>
							<label>Cursor</label>
							<Input id="cursor" value={querySettings.cursor} placeholder="Cursor"
								onChange={(e) => setQuerySettings({ cursor: parseInt(e.target.value) })}
								type="number" />
						</FormGroup>
					</div>*/}
				</div>
				<div className="mt-5 mb-5">
					<h3>Profile Lookups</h3>
					<div className="mb-3 mt-3">
						<Button color="primary" onClick={() => {
							resolveUsers(database, twitterClient, 'followers',
								querySettings.limit, querySettings.offset, followers.count)
						}}>
							Lookup Follower Profiles
						</Button>
						{' '}
						<Button color="primary" onClick={() => {
							resolveUsers(database, twitterClient, 'followees',
								querySettings.limit, querySettings.offset, followees.count)
						}}>
							Lookup Followee Profiles
						</Button>
					</div>
					<div className="mb-3 mt-3">
						{/*<FormGroup>
							<label>Limit</label>
							<Input id="limit" value={querySettings.limit} placeholder="Limit"
								onChange={(e) => setQuerySettings({ limit: parseInt(e.target.value) })}
								type="number" />
						</FormGroup>*/}
						<FormGroup>
							<label>Offset</label>
							<Input id="offset" value={querySettings.offset} placeholder="Offset"
								onChange={(e) => setQuerySettings({ offset: parseInt(e.target.value) })}
								type="number" />
						</FormGroup>
					</div>
				</div>
			</Container>
      <style jsx>{`
      `}</style>
		</>
	)
}

const mapStateToProps = (state) => ({
  database: state.database,
	twitterClient: state.twitterClient,
	twitterUsername: state.twitterUsername
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
