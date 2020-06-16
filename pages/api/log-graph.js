import { logFollowers, logFollowees } from '../../lib/log-graph'
import { Pool } from 'pg'
import { parse } from 'pg-connection-string' 
import Twit from 'twit'

export default async (req, res) => {
  const { body: { dbString, twitterClient, twitterUsername, group, cursor } } = req

  const dbConfig = parse(dbString)
  const db = new Pool(dbConfig)

  const twitterAPIConfig = {
    consumer_key: twitterClient.consumerKey,
    consumer_secret: twitterClient.consumerSecret,
    access_token: twitterClient.accessToken,
    access_token_secret: twitterClient.accessTokenSecret,
    timeout_ms: 60*1000,
    strictSSL: true
  }
  const twitterAPI = new Twit(twitterAPIConfig)

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
