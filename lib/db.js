import { Pool } from 'pg'

const db = new Pool({
	user: process.env.POSTGRESQL_USER,
	host: process.env.POSTGRESQL_HOST,
	database: process.env.POSTGRESQL_DATABASE,
	password: process.env.POSTGRESQL_PASSWORD,
	port: 5432
})

export default db