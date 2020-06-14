import db from '../../lib/db'
import twitterAPI from '../../lib/twitter-api'
import resolveUsers from '../../lib/resolve-users'

export default async (req, res) => {
  // username is the twitter username
  // group is either 'followers' or 'followees'
  // first is the index of the first user to resolve
  // last is the index of the last user to resolve

  const { body: { username, group, first, last } } = req

  const twitterAPIWrapper = {
    api: twitterAPI,
    username: username
  }
  
  resolveUsers(db, twitterAPIWrapper, group, first, last)

  const response = { "success": true }

  res.json(response)
}