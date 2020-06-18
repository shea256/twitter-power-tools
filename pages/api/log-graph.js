import { Pool } from 'pg'
import { parse } from 'pg-connection-string' 
import { buildTwitterAPIFromConfig } from '../../lib/twitter-api'
import { sleep } from '../../lib/utils' 
//import Queue from 'bull'

export function logGraph(db, twitterAPI, twitterUsername, group, cursor) {
  return new Promise((resolve, reject) => {
    if (group !== 'followers' && group !== 'followees') {
      reject('Invalid group specified - must be "followers" or "followees"')
    }
    const options = { screen_name: twitterUsername, cursor: cursor }
    const apiEndpoint = group === 'followers' ? 'followers/ids' : 'friends/ids'
    twitterAPI.get(apiEndpoint, options, (error, data, response) => {
      if (error) {
        reject(error)
      }
      
      const nextCursor = data['next_cursor']
      //console.log(`Next Cursor: ${nextCursor}`)

      const users = data['ids'].map(id => {
        const userTemplate = group === 'followers' ?
          { following_me: true } : { followed_by_me: true }
        return Object.assign({}, userTemplate, { id })
      })
  
      if (!users.length) {
        reject('No users found')
      } else {
        let queryString = group === 'followers' ?
          'INSERT INTO followers (id, following_me) VALUES ' :
          'INSERT INTO followees (id, followed_by_me) VALUES '
        users.map(follower => {
          const followStatusValue = group === 'followers' ?
            'following_me' : 'followed_by_me'
          queryString += `('${follower.id}', ${follower[followStatusValue]}),`
        })
        queryString = queryString.replace(/\,$/, '')
        const queryStringPart2 = group === 'followers' ?
          ' ON CONFLICT (id) DO UPDATE SET following_me = excluded.following_me' :
          ' ON CONFLICT (id) DO UPDATE SET followed_by_me = excluded.followed_by_me'
        queryString += queryStringPart2
        
        db.query(queryString, (error, results) => {
          if (error) {
            throw error
          }
          //console.log(results)
          console.log(`Inserted ${users.length} records into Twitter ${group} table`)
          resolve(nextCursor)
        })
      }
    })

  })
}

export default async (req, res) => {
  const { body: { db, twitterClient, twitterUsername, group, cursor } } = req

  const dbPool = new Pool(parse(db.string))

  const twitterAPI = buildTwitterAPIFromConfig(twitterClient)

  let currentCursor = cursor
  while (currentCursor !== 0) {
    console.log(`Starting to log from cursor ${currentCursor}`)
    try {
      currentCursor = await logGraph(dbPool, twitterAPI, twitterUsername, group, currentCursor)
    } catch (e) {
      res.json({ error: e })
    }
    console.log(`Finished logging from cursor ${currentCursor}; sleeping for 1 second`)
    await sleep(1000)
  }

  res.json({ cursor: currentCursor })
}

/*
const redisQueue = new Queue('twitter graph logging', db.redis)

redisQueue.process((job, done) => {
  
  console.log(cursor)
  done(null, { cursor: cursor })
})*/