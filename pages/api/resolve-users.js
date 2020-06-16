import { Pool } from 'pg'
import { parse } from 'pg-connection-string'
import resolveUsers from '../../lib/resolve-users'
import { buildTwitterAPIFromConfig } from '../../lib/twitter-api'

export default async (req, res) => {
  const { body: { dbString, twitterClient, group, limit, offset } } = req
  
  const db = new Pool(parse(dbString))

  const twitterAPI = buildTwitterAPIFromConfig(twitterClient)

  try {
    resolveUsers(db, twitterAPI, group, limit, offset)
  } catch(e) {
    res.json({ error: e, success: false })
  }
  
  res.json({ error: null, success: true })
}