export function messageUser(twitterAPI, recipientID, message) {
  const options = {
    event: {
      type: 'message_create',
      message_create: {
        target: {
          recipient_id: recipientID
        },
        message_data: {
          text: message
        }
      }
    }
  }

  twitterAPI.post('direct_messages/events/new', options,
  (error, data, response) => {
		if (error) {
			throw error
		}

    return {
      success: true
    }
	})
}
