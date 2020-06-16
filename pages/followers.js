import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import PaginationLinks from '../components/PaginationLinks'
import { getPaginationVariables } from '../lib/pagination'

const fetcher = (url, dbString, twitterClient, limit, offset) => fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    dbString,
    twitterClient,
    limit,
    offset
  })
})
.then(r => r.json())

const FollowersTable = ({ followers, followersCount, page, pageSize }) => {
  const pageCount = Math.ceil(followersCount / pageSize)
  return (
    <>
      <PaginationLinks linkHref={'/followers'} currentPage={page} pageCount={pageCount} />
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
          {followers.map((follower, index) => (
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
      <PaginationLinks linkHref={'/followers'} currentPage={page} pageCount={pageCount} />
    </>
  )
}

const Followers = ({ database, twitterClient, query }) => {
  const pageSize = 100
  const { skip, first, page } = getPaginationVariables(pageSize, query)
  const { data, error } = useSWR(
    ['/api/query-graph', database.string, twitterClient, first, skip], fetcher)
	return (
		<>
			<Container>
        <h1 className="mt-5">Followers</h1>
        <div className="mt-3 mb-5">
        { error ? (<h3>Failed to load followers</h3>) : null }
        { !error & !data ? (<h3>Loading...</h3>) : null }
        { data && data.followers ? (
          <FollowersTable followers={data.followers} followersCount={data.count}
            page={page} pageSize={pageSize} />
        ) : null }
        </div>
      </Container>
		</>
	)
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      query
    }, // will be passed to the page component as props
  }
}

const mapStateToProps = (state) => ({
  database: state.database,
  twitterClient: state.twitterClient
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(Followers)
