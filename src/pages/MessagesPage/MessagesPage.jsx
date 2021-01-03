import React, { useEffect } from 'react'
import { useSubscription, gql } from '@apollo/client';
import MessageRooms from '../../components/MessageRooms/MessageRooms';
import Messages from '../../components/Messages/Messages';
import { useMessageDispatch } from '../../context/message'
import { Col, Row } from 'reactstrap';

const NEW_MESSAGE = gql`
  subscription {
    newMessage {
      mid
      room
      from
      to
      content
      created
    }
  }
`;

const MessagesPage = () => {
  const messageDispatch = useMessageDispatch()

  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE
  )

  useEffect(() => {
    if (messageError) console.log(messageError)

    if (messageData) {
      const message = messageData.newMessage
      messageDispatch({
        type: 'ADD_MESSAGE',
        payload: {
          rid: message.room,
          message,
        },
      })
    }
  }, [messageError, messageData])

  return (
    <div className="messages-page container py-5 px-4">
      <Row className="rounded-lg overflow-hidden shadow">
        <Col md={5} className="px-0">
          <div className="bg-gray px-4 py-2 bg-light">
            <p className="h5 mb-0 py-1">Recent</p>
          </div>
          <MessageRooms />
        </Col>
        <Col md={7} className="px-0">
          <Messages />
        </Col>
      </Row>
    </div>
  )
}

MessagesPage.propTypes = {

}

export default MessagesPage
