const Twit = require('twit')
const fs = require('fs')
const Pool = require('pg').Pool

const trimComma = require('./src/utils').trimComma

const resolveUsers = require('./src/resolve-users')

const db = new Pool({
	user: process.env.POSTGRESQL_USER,
	host: process.env.POSTGRESQL_HOST,
	database: process.env.POSTGRESQL_DATABASE,
	password: process.env.POSTGRESQL_PASSWORD,
	port: 5432
})

const twitterAPI = new Twit({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
	timeout_ms: 60*1000,
	strictSSL: true
})

const twitter = {
	api: twitterAPI,
	username: 'ryaneshea'
}

//logFollowees(db, twitterOptions, '1536987138437182000')
//logFollowers(db, twitter, '1536987138437182000')

resolveUsers(db, twitter, 'followers', 100, 1900)