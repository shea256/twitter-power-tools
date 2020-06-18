import { Button } from 'reactstrap'
import PaginationLinks from '../components/PaginationLinks'
import MessageModal from '../components/MessageModal'

const UsersTable = ({ twitterClient, link, users, usersCount, page, pageSize }) => {
  const pageCount = Math.ceil(usersCount / pageSize)
  return (
    <>
      <PaginationLinks linkHref={link} currentPage={page} pageCount={pageCount} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Followers</th>
            <th scope="col">Followees</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const followersCount = user.followers_count ?
              user.followers_count.toLocaleString() : null
            const followeesCount = user.followees_count ?
              user.followees_count.toLocaleString() : null
            return (
            <tr key={user.id}>
              <th scope="row">{(page-1)*pageSize + index+1}</th>
              <td>{user.name}</td>
              <td>{user.id}</td>
              <td>
                <a href={`https://twitter.com/${user.username}`} target="_blank">
                  @{user.username}
                </a>
              </td>
              <td>{followersCount}</td>
              <td>{followeesCount}</td>
              <td>
                <MessageModal
                  twitterClient={twitterClient}
                  initialRecipients={[user]}
                  toggler={
                    <Button outline block>
                      Message
                    </Button>
                  }
                />
              </td>
            </tr>
          )})}
        </tbody>
      </table>
      <PaginationLinks linkHref={link} currentPage={page} pageCount={pageCount} />
    </>
  )
}

export default UsersTable