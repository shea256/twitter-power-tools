import { messageUser } from '../../lib/message-users'
import { buildTwitterAPIFromConfig } from '../../lib/twitter-api'

export default async (req, res) => {
  const { body: {twitterClient, recipients, message } } = req

  const twitterAPI = buildTwitterAPIFromConfig(twitterClient)
  
  const recipientID = recipients.length ? recipients[0].id : null

  messageUser(twitterAPI, recipientID, message)

  const response = { "success": true }

  res.json(response)
}
