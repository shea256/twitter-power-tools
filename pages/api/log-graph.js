import { logFollowers, logFollowees } from '../../lib/log-graph'
import { Pool } from 'pg'
import { parse } from 'pg-connection-string' 
import { buildTwitterAPIFromConfig } from '../../lib/twitter-api'

export default async (req, res) => {
  const { body: { dbString, twitterClient, twitterUsername, group, cursor } } = req

  const db = new Pool(parse(dbString))

  const twitterAPI = buildTwitterAPIFromConfig(twitterClient)

  switch (group) {
    case 'followers':
      logFollowers(db, twitterAPI, twitterUsername, cursor)
      break;
    case 'followees':
      logFollowees(db, twitterAPI, twitterUsername, cursor)
      break;
    default:
      break;
  }

  const response = { "success": true }

  res.json(response)
}
