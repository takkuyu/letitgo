import React from 'react'
import moment from 'moment'
import { useMessageDispatch, useMessageState } from '../../context/message'
import { gql, useQuery } from '@apollo/client';
import classNames from 'classnames'
import { ListGroupItem } from 'reactstrap';

export const GET_ROOMS = gql`
  query getRooms($uid:String!) {
    getRooms(uid: $uid) {
      rid
      from {
        uid
        username
        picture
      }
      to{
        uid
        username
        picture
      }
      post{
        title
        imageurl
        price
        location
      }
      latestMessage
    }
  }
`;

const MessageRooms = ({ currentUser }) => {
  const dispatch = useMessageDispatch()
  const { rooms } = useMessageState();

  const { loading } = useQuery(GET_ROOMS, {
    variables: { uid: currentUser.uid },
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      dispatch({ type: 'SET_ROOMS', payload: data.getRooms });
    },
    onError: (err) => console.log(err),
  });

  if (!rooms || loading) return <p>loading...</p>

  if (rooms.length === 0) return <p>No users found</p>

  return (
    <div className="messages-box">
      <div className="list-group rounded-0">
        {
          rooms.map(({ rid, from, to, latestMessage, selected }) => {
            const roomUser = to.uid === currentUser.uid ? from : to;
            return (
              <ListGroupItem
                key={rid}
                onClick={() =>
                  dispatch({ type: 'SET_SELECTED_ROOM', payload: rid })
                }
                className={classNames(
                  'list-group-item-action',
                  {
                    'active': selected,
                  }
                )}
              >
                <div className="media"><img src={roomUser.picture} alt="user" width="50" height="50" className="rounded-circle" />
                  <div className="media-body ml-4 overflow-hidden">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <h6 className="mb-0">{roomUser.username}</h6>
                      {/* <small className="small font-weight-bold">14 Dec</small> */}
                    </div>
                    <p className="messages-box__latest-message font-italic mb-0 text-small">
                      {latestMessage
                        ? latestMessage
                        : 'You are now connected!'}
                    </p>
                  </div>
                </div>
              </ListGroupItem>
            )
          })
        }
      </div>
      <p className="demo-link">* To demo Realtime Chat, click <a href="/demo/2" target="_blank">here to login as another user.</a></p>
    </div>
  )
}

export default MessageRooms
