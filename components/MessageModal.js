import {
  Modal, ModalHeader, ModalBody, Input, FormGroup, ModalFooter, Button
} from 'reactstrap'
import { useState } from 'react'

const sendMessage = async (twitterClient, recipients, message) => {
	const response = fetch('/api/send-message', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			twitterClient,
      recipients,
      message
		})
	})
	return response
}

const MessageModal = ({ twitterClient, initialRecipients, toggler }) => {
  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState('')
  const [recipients, setRecipients] = useState(initialRecipients)
  const toggleModal = () => setModal(!modal)
  return (
    <>
      <div onClick={toggleModal}>
        {toggler}
      </div>
      <Modal isOpen={modal} toggle={toggleModal} className="modal-lg">
        <ModalHeader>Send a Message</ModalHeader>
        <ModalBody>
          <FormGroup>
						<label>Recipient(s)</label>
            <Input id="usernames" value={
              recipients.map((r) => r.username).join(',')
            } readOnly />
					</FormGroup>
          <FormGroup>
						<label>Message</label>
						<Input type="textarea" rows="4" id="message" value={message}
							onChange={(e) => setMessage(e.target.value)} />
					</FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => {
            toggleModal()
          }}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => {
            console.log(`Sending message to ${recipients}`)
            sendMessage(twitterClient, recipients, message)
            toggleModal()
          }}>
            Send
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default MessageModal