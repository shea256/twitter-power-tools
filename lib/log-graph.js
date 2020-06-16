export function logFollowers(db, twitterAPI, twitterUsername, cursor) {
	const options = { screen_name: twitterUsername, cursor: cursor }
	twitterAPI.get('followers/ids', options, (error, data, response) => {
		if (error) {
			throw error
		}
		//console.log(data)

		const nextCursor = data['next_cursor']
		console.log(`Next Cursor: ${nextCursor}`)

		const followers = data['ids'].map(id => {
			return { id: id, following_me: true}
		})

		if (!followers.length) {
			console.log('no followers found')
		} else {
			let queryString = 'INSERT INTO followers (id, following_me) VALUES '
			followers.map(follower => {
				queryString += `('${follower.id}', ${follower.following_me}),`
			})
			queryString = queryString.replace(/\,$/, '')
			queryString += ' ON CONFLICT (id) DO UPDATE SET following_me = excluded.following_me'
			//console.log(queryString)

			db.query(queryString, (error, results) => {
				if (error) {
					throw error
				}
				//console.log(results)
				console.log(`Inserted ${followers.length} records into Twitter followees table`)
			})
		}
	})
}

export function logFollowees(db, twitterAPI, twitterUsername, cursor) {
	const options = { screen_name: twitterUsername, cursor: cursor }
	twitterAPI.get('friends/ids', options, (error, data, response) => {
		if (error) {
			throw error
		}

		const nextCursor = data['next_cursor']
		console.log(`Next Cursor: ${nextCursor}`)

		const followees = data['ids'].map(id => {
			return { id: id, followed_by_me: true}
		})

		if (!followees.length) {
			console.log('no followees found')
		} else {
			let queryString = 'INSERT INTO followees (id, followed_by_me) VALUES '
			followees.map(followee => {
				queryString += `('${followee.id}', ${followee.followed_by_me}),`
			})
			queryString = queryString.replace(/\,$/, '')
			//console.log(queryString)
	
			db.query(queryString, (error, results) => {
				if (error) {
					throw error
				}
				//console.log(results)
				console.log(`Inserted ${followees.length} records into Twitter followees table`)
			})
		}
	})
}
