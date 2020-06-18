import { Container, Button, FormGroup, Input } from 'reactstrap'
import fetch from 'isomorphic-unfetch'
import { useQuerySettings } from '../lib/actions'
import { connect } from 'react-redux'
import useSWR from 'swr'
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

	return (
		<>
			<Container>
				<h1 className="mt-5 text-center">Export Your Twitter Followers</h1>
				<div className="mt-5 mb-5">
					<h3>Stats</h3>
					<div className="card-columns">
						{followers ? (
							<>
								<div className="card text-white bg-dark mb-3">
									<div className="card-header">Follower ID's logged</div>
									<div className="card-body">
										<h4 className="card-title">
											{parseInt(followers.count).toLocaleString()}
										</h4>
									</div>
								</div>
								<div className="card text-white bg-dark mb-3">
									<div className="card-header">Follower profiles logged</div>
									<div className="card-body">
										<h4 className="card-title">
											{parseInt(followers.resolvedCount).toLocaleString()}
										</h4>
									</div>
								</div>
							</>
						) : null }

						{followees ? (
							<>
								<div className="card text-white bg-dark mb-3">
									<div className="card-header">Followee ID's logged</div>
									<div className="card-body">
										<h4 className="card-title">
											{parseInt(followees.count).toLocaleString()}
										</h4>
									</div>
								</div>
								<div className="card text-white bg-dark mb-3">
									<div className="card-header">Followee profiles logged</div>
									<div className="card-body">
										<h4 className="card-title">
											{parseInt(followees.resolvedCount).toLocaleString()}
										</h4>
									</div>
								</div>
							</>
						) : null }
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
					{/*<div className="mb-3 mt-3">
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
					</div>*/}
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
