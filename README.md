# Twitter Graph Logger

### Getting Started

1. Make sure the required environment variables are present in the environment
2. Run `node index`

### Environment Variables

- POSTGRESQL_PASSWORD
- TWITTER_CONSUMER_SECRET
- TWITTER_ACCESS_TOKEN_SECRET

### To Run

First, create the followers table:

```
CREATE TABLE followers (
	id BIGINT PRIMARY KEY,
	name TEXT,
	username VARCHAR(15),
	location TEXT,
	description TEXT,
	url TEXT,
	followers_count INTEGER,
	followees_count INTEGER,
	created_at TEXT,
	verified BOOLEAN,
	statuses_count INTEGER,
	language TEXT,
	background_image TEXT,
	profile_image TEXT,
	banner_image TEXT,
	following_me BOOLEAN,
	followed_by_me BOOLEAN,
	muting BOOLEAN,
	blocking BOOLEAN,
	blocked_by BOOLEAN
)
```

Second, create the followees table:

```
CREATE TABLE followees (
	id BIGINT PRIMARY KEY,
	name TEXT,
	username VARCHAR(15),
	location TEXT,
	description TEXT,
	url TEXT,
	followers_count INTEGER,
	followees_count INTEGER,
	created_at TEXT,
	verified BOOLEAN,
	statuses_count INTEGER,
	language TEXT,
	background_image TEXT,
	profile_image TEXT,
	banner_image TEXT,
	following_me BOOLEAN,
	followed_by_me BOOLEAN,
	muting BOOLEAN,
	blocking BOOLEAN,
	blocked_by BOOLEAN
)
```