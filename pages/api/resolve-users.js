import resolveUsers from '../../lib/resolve-users'
import { Pool } from 'pg'
import { parse } from 'pg-connection-string' 
import Twit from 'twit'

export default async (req, res) => {
  const { body: { dbString, twitterClient, group, limit, offset } } = req
  
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

  resolveUsers(db, twitterAPI, group, limit, offset)

  const response = { "success": true }

  res.json(response)
}