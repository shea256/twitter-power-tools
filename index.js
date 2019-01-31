const Twit = require('twit')
const fs = require('fs')
const Pool = require('pg').Pool

function trimComma(string) {
	return string.trim().replace(/\,$/, '')
}

function logFollowees(db, twitter, cursor) {
	const options = { screen_name: twitter.username, cursor: cursor }
	twitter.api.get('friends/ids', options, (error, data, response) => {
		if (error) {
			throw error
		}

		const followees = data['ids'].map(id => {
			return { id: id, following_me: true}
		})

		let queryString = 'INSERT INTO followees (id, followed_by_me) VALUES '
		followees.map(followee => {
			queryString += `('${followee.id}', ${followee.followed_by_me}),`
		})
		queryString = queryString.replace(/\,$/, '')

		db.query(queryString, (error, results) => {
			if (error) {
				throw error
			}
			console.log(results)
			console.log(`Inserted ${followees.length} records into Twitter followees table`)
		})

	})
}

function logFollowers(db, twitter, cursor) {
	const options = { screen_name: twitter.username, cursor: cursor }
	twitter.api.get('followers/ids', options, (error, data, response) => {
		if (error) {
			throw error
		}

		const nextCursor = data['next_cursor']
		console.log(`Next Cursor: ${nextCursor}`)

		const followers = data['ids'].map(id => {
			return { id: id, following_me: true}
		})

		let queryString = 'INSERT INTO followers (id, following_me) VALUES '
		followers.map(follower => {
			queryString += `('${follower.id}', ${follower.following_me}),`
		})
		queryString = queryString.replace(/\,$/, '')
		queryString += ' ON CONFLICT (id) DO UPDATE SET following_me = excluded.following_me'

		db.query(queryString, (error, results) => {
			if (error) {
				throw error
			}
			console.log(results)
			console.log(`Inserted ${followers.length} records into Twitter followees table`)
		})

	})
}

function buildUserListString(results) {
	const usersFromDB = results['rows']

	let userListString = ''

	usersFromDB.map(user => {
		userListString += `${user.id},`
	})

	userListString = userListString.replace(/\,$/, '')

	return userListString
}

function formatUsersFromTwitterResponse(data, tableName) {
	let newUsers = []

	data.map(user => {
		const followingMe = (tableName === 'followers') ? true : false
		const followedByMe = (tableName === 'followees') ? true : false

		newUsers.push({
			id: user.id,
			name: user.name,
			username: user.screen_name,
			location: user.location,
			description: user.description,
			url: user.url,
			followers_count: user.followers_count,
			followees_count: user.friends_count,
			listed_count: user.listed_count,
			created_at: user.created_at,
			favorites_count: user.favourites_count,
			verified: user.verified,
			statuses_count: user.statuses_count,
			language: user.lang,
			background_image: user.profile_background_image_url_https,
			profile_image: user.profile_image_url_https,
			banner_image: user.profile_banner_url,
			following_me: followingMe,
			followed_by_me: followedByMe
		})
	})

	return newUsers
}

function buildQueryStringForUserUpdate(id, fields, tableName) {
	const fieldNames = fields.map(field => field[0])
	let queryString = `UPDATE ${tableName} SET `
	let setStatements = []
	fieldNames.map((fieldName, i) => {
		setStatements.push(`${fieldName} = ($${i+1})`)
	})
	queryString += setStatements.join(', ')
	queryString += ` WHERE id = ${id}`
	return queryString
}

function getValuesFromUser(user, fields) {
	let values = []

	fields.map((field, index) => {
		const fieldName = field[0]
		const fieldType = field[1]

		let value = user[fieldName]

		if (!user.hasOwnProperty(fieldName) || value === undefined || value === null) {
			if (fieldType === 'text') {
				value = ''
			} else if (fieldType === 'boolean') {
				value = null
			} else if (fieldType === 'numeric') {
				value = 0
			} else {
				throw 'Invalid field type'
			}
		}

		values.push(value)
	})

	return values
}

function resolveUsers(db, twitter, tableName, limit, offset) {
	console.log('\n' + '='.repeat(50) + `\nTable: ${tableName}, Limit: ${limit}, Offset: ${offset}\n` + '='.repeat(50) + '\n')

	const queryStringForUserSelect = `SELECT id FROM ${tableName} ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`
	const fields = [
		['name', 'text'],
		['username', 'text'],
		['location', 'text'],
		['description', 'text'],
		['url', 'text'],
		['followers_count', 'numeric'],
		['followees_count', 'numeric'],
		['listed_count', 'numeric'],
		['verified', 'boolean'],
		['statuses_count', 'numeric'],
		['language', 'text'],
		['background_image', 'text'],
		['profile_image', 'text'],
		['banner_image', 'text'],
		['following_me', 'boolean'],
		['followed_by_me', 'boolean']
	]

	db.query(queryStringForUserSelect, (error, results) => {
		if (error) {
			throw error
		}

		const userListString = buildUserListString(results)
		const options = { user_id: userListString }
		twitter.api.get('users/lookup', options, (error, data, response) => {
			if (error) {
				throw error
			}

			const users = formatUsersFromTwitterResponse(data, tableName)

			users.map((user, index) => {
				const queryStringForUserUpdate = buildQueryStringForUserUpdate(user.id, fields, tableName)

				const values = getValuesFromUser(user, fields)
				console.log(`${index} Updating user ${values[0]} (${values[1]})`)

				db.query(queryStringForUserUpdate, values, (error, results) => {
					if (error) {
						throw error
					}
				})
			})

		})

	})
}

const db = new Pool({
	user: 'bluesparrow',
	host: 'localhost',
	database: 'twittergraph',
	password: process.env.POSTGRESQL_PASSWORD,
	port: 5432
})

const twitterAPI = new Twit({
	consumer_key: 'umOBvMvPbpMav1qLFkDTA',
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: '118917461-iVxCuTQbG65fQKaFFoZzjjulDG90z7TXDWXa1fxt',
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
	timeout_ms: 60*1000,
	strictSSL: true
})

const twitter = {
	api: twitterAPI,
	username: 'ryaneshea'
}

function index() {
	resolveUsers(db, twitter, 'followers', 100, 1300)
	//logFollowees(db, twitterOptions, '1536987138437182000')
	//logFollowers(db, twitter, '1536987138437182000')
}

index()
















/*
db.query('SELECT * FROM followers ORDER BY id ASC', (error, results) => {
	if (error) {
		throw error
	}
	console.log(`Results: ${results}`)
})*/


/*function buildQueryStringForUserUpdate(fields, tableName) {
	const fieldNames = fields.map(field => field[0])

	let queryString = `UPDATE ${tableName} AS t SET `
	
	fieldNames.map(fieldName => {
		queryString += `${fieldName} = c.${fieldName}, `
	})
	queryString = trimComma(queryString)
	queryString += ' FROM (VALUES '
	queryString += '($1, '
	fieldNames.map((fieldName, index) => {
		queryString += `$${index+2}, `
	})
	queryString = trimComma(queryString)
	queryString += `) ) AS c(id, ${fieldNames.join(', ')}) WHERE c.id = t.id`

	return queryString
}*/

