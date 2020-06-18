# Movement 🎪

View your twitter followers and send them messages.

### Running the App Locally

1. Clone this repository
1. `cd` into the folder and run `npm install`
1. Run `npm run dev` to start the server

### Using the App

1. Create a Twitter API app and enter your Twitter API credentials in the settings page
1. Create a postgresql database and enter your database settings in the settings page
1. Click the "Log Follower ID's" button to start logging your Twitter followers - watch the console logs and don't close or refresh the page until the logs stop
1. Click the "Lookup Follower Profiles" button to start looking up the profiles of your Twitter followers - watch the console logs and don't close or refresh the page until the logs stop
1. Repeat the previous two steps for your followees
1. View your followers and followees on their respective pages and click the "Message" button to send a direct message to a user or a group of users

### Creating a Twitter App

To use the Twitter API, you must register a Twitter App at https://developer.twitter.com/en/apps.

Once there, click the "Create an app" button and fill out the information for your app.

When creating it, make sure you set the permissions to "Read, write, and Direct Messages".

Once you've created the app and set the permissions, go to the "Keys and tokens" tab and copy-paste the consumer key, consumer secret, access token, and access token secret into the settings page of the Twitter Export app.

### Creating a database

To use the Twitter Export tool, you need to provide your own postgresql database credentials.

Any database will work, but we recommend using a hosted database provider like ElephantSQL for simplicity.

To setup a postgresql database on ElephantSQL, go to https://www.elephantsql.com/ and create an account. If your account doesn't come with a database instance, create one. You may have to upgrade from the free plan to a basic plan to ensure the database requests aren't rate limited.

Once you have your database instance created, go to the details tab, click the eye icon and copy-paste the database URL into the settings page of the Twitter Export app.

Last, create your database tables by navigating to the SQL Browser tab and then entering in the commands below.

Create the followers table:

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

Create the followees table:

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
