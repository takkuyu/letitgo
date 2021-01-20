import React, { useEffect, useRef, useState } from 'react';
import { useSubscription, gql } from '@apollo/client';
import MessageRooms from '../../components/MessageRooms/MessageRooms';
import Messages from '../../components/Messages/Messages';
import Icon from '../../components/Icon/Icon';
import { useMessageDispatch } from '../../context/message';
import { Col, Row } from 'reactstrap';
import { useAuthState } from '../../context/auth';
import classNames from 'classnames';

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
  const messageDispatch = useMessageDispatch();
  const { user } = useAuthState();
  const messagesContRef = useRef(null);
  const [messagesActive, setMessagesActive] = useState(false);

  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE,
    {
      onSubscriptionData: (data) => {
        console.log(data);
      },
    }
  );

  useEffect(() => {
    if (messageError) console.log(messageError);

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
      });
    }
  }, [messageError, messageData]);

  const scrollToBottomChat = (ref) => {
    const scroll = ref.current.scrollHeight - ref.current.clientHeight;
    ref.current.scrollTo(0, scroll);
  };

  return (
    <div className="messages-page">
      <Row className="messages-page-row rounded-lg overflow-hidden mx-0">
        <Col md={4} lg={3} className="messages-page-row__left">
          <div
            className={classNames('messages-page-row__left-top', {
              'messages-active': messagesActive,
            })}
          >
            <span
              className="back-button d-flex align-items-center"
              onClick={() => setMessagesActive(false)}
            >
              <Icon
                iconClassCode="bi bi-arrow-left-circle"
                size={18}
                top={-2}
                mr={7}
              />
              Back
            </span>
            <p className="messages-copy icon-comments">Messages</p>
          </div>
          <div>
            <MessageRooms
              currentUser={user}
              setMessagesActive={() => setMessagesActive(true)}
              messagesActive={messagesActive}
            />
          </div>
        </Col>
        <Col md={8} lg={9} className="messages-page-row__right px-0">
          <Messages
            currentUser={user}
            messagesContRef={messagesContRef}
            messagesActive={messagesActive}
          />
        </Col>
      </Row>
    </div>
  );
};

export default MessagesPage;
