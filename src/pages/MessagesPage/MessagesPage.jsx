import React, { useEffect, useRef } from 'react'
import { useSubscription, gql } from '@apollo/client';
import MessageRooms from '../../components/MessageRooms/MessageRooms';
import Messages from '../../components/Messages/Messages';
import { useMessageDispatch } from '../../context/message'
import { Col, Row } from 'reactstrap';
import { useAuthState } from '../../context/auth';

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
  const { user } = useAuthState();
  const messagesContRef = useRef(null)

  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE, {
    onSubscriptionData: (data) => {
      console.log(data)
    },
  }
  )

  useEffect(() => {
    if (messageError) console.log(messageError)

    if (messageData) {
      const message = messageData.newMessage;

      // Scroll to bottom
      scrollToBottomChat(messagesContRef);

      messageDispatch({
        type: 'ADD_MESSAGE',
        payload: {
          rid: message.room,
          message,
        },
      })
    }
  }, [messageError, messageData])

  const scrollToBottomChat = (ref) => {
    const scroll =
      ref.current.scrollHeight -
      ref.current.clientHeight;
    ref.current.scrollTo(0, scroll);
  };

  return (
    <div className="messages-page p-4">
      <Row className="messages-page-row rounded-lg overflow-hidden mx-0">
        <Col sm={3} className="messages-page-row__left">
          <div className="messages-page-row__left-top">
            <p className="icon-comments">Messages</p>
          </div>
          <MessageRooms currentUser={user} />
        </Col>
        <Col sm={9} className="messages-page-row__right px-0">
          <Messages currentUser={user} messagesContRef={messagesContRef} />
        </Col>
      </Row>
    </div>
  )
}

MessagesPage.propTypes = {

}

export default MessagesPage
