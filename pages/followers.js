import { Container, Button, FormGroup, Input } from 'reactstrap'
import { useState } from 'react'
import { queryGraph } from '../lib/query-graph'
import { connect } from 'react-redux'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'

const fetcher = (url, dbString, twitterClient) => fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    dbString,
    twitterClient,
  })
})
.then(r => r.json())

const Followers = (props) => {
  //const [followers, setFollowers] = useState([])

  const dbString = props.database.string
  const twitterClient = props.twitterClient

  const { data, error } = useSWR(['/api/query-graph', dbString, twitterClient], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <Container><h3>loading...</h3></Container>

	return (
		<>
			<Container>
        <h1 className="mt-5">Followers</h1>
				<div className="mt-3 mb-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Followers</th>
                <th scope="col">Followees</th>
              </tr>
            </thead>
            <tbody>
              {data.followers.map((follower, index) => (
                <tr key={follower.id}>
                  <th scope="row">{index}</th>
                  <td>{follower.id}</td>
                  <td>{follower.name}</td>
                  <td>{follower.username}</td>
                  <td>{follower.followers_count}</td>
                  <td>{follower.followees_count}</td>
                </tr>
              ))}
            </tbody>
          </table>          
        </div>
      </Container>
		</>
	)
}

const mapStateToProps = (state) => ({
  database: state.database,
  twitterClient: state.twitterClient
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(Followers)
