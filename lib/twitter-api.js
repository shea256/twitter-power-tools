import Twit from 'twit'

export const buildTwitterAPIFromConfig = (twitterClient) => {
  return new Twit({
    consumer_key: twitterClient.consumerKey,
    consumer_secret: twitterClient.consumerSecret,
    access_token: twitterClient.accessToken,
    access_token_secret: twitterClient.accessTokenSecret,
    timeout_ms: 60*1000,
    strictSSL: true
  })
}