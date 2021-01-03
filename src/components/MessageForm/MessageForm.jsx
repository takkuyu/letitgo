import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Form, Input } from 'reactstrap'

const SEND_MESSAGE = gql`
  mutation PostMessage($room: String!, $to: String!, $content: String!) {
    postMessage(room: $room, to: $to, content: $content) {
      from
      to
      content
    }
  }
`

const MessageForm = ({ room }) => {
  const [content, setContent] = useState('')

  const [postMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.log(err),
  })

  const submitMessage = (e) => {
    e.preventDefault();

    const sent = (room.from.uid == localStorage.getItem('userId'));
    const to = sent ? room.to.uid : room.from.uid;

    if (content.trim() === '' || !to) return

    setContent('')

    // mutation for sending the message
    postMessage({ variables: { room: room.rid, to, content } })
  }

  return (
    <Form className="bg-light" onSubmit={submitMessage}>
      <div className="input-group">
        <Input
          type="text"
          placeholder="Type a message"
          className="form-control rounded-0 border-0 py-4 bg-light"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <div className="input-group-append">
          <button id="button-addon2" type="submit" className="btn btn-link"> <i className="fa fa-paper-plane"></i></button>
        </div>
      </div>
    </Form>
  )
}

MessageForm.propTypes = {

}

export default MessageForm
