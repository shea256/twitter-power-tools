import db from '../../lib/db'
import twitterAPI from '../../lib/twitter-api'
import { logFollowers, logFollowees } from '../../lib/log-ids'

export default async (req, res) => {
  // username is the twitter username
  // group is either 'followers' or 'followees'
  // first is the index of the first user to resolve
  // last is the index of the last user to resolve

  const { body: { username, group, cursor } } = req

  const twitterAPIWrapper = {
    api: twitterAPI,
    username: username
  }

  switch (group) {
    case 'followers':
      logFollowers(db, twitterAPIWrapper, cursor)
      break;
    case 'followees':
      logFollowees(db, twitterAPIWrapper, cursor)
      break;
    default:
      break;
  }

  const response = { "success": true }

  res.json(response)
}