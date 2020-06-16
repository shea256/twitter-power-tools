import { Pool } from 'pg'
import { parse } from 'pg-connection-string' 
import { queryGraph } from '../../lib/query-graph'

export default async (req, res) => {
  const { body: { dbString, twitterClient, table, limit, offset } } = req

  if (!twitterClient || !twitterClient.consumerKey
      || !twitterClient.consumerKey.length) {
    res.json({ followers: [] })
    return
  }

  const db = new Pool(parse(dbString))

  const queryResults = await queryGraph(
    db, table, limit, offset, 'followers_count', 'DESC')

  const response = queryResults

  res.json(response)
}
