import React from 'react'
import moment from 'moment'
import { useMessageDispatch, useMessageState } from '../../context/message'
import { gql, useQuery } from '@apollo/client';
import classNames from 'classnames'

const GET_ROOMS = gql`
  query getRooms($uid:Int!) {
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
      }
      latestMessage
    }
  }
`;

const MessageRooms = () => {
  const dispatch = useMessageDispatch()
  const { rooms } = useMessageState();

  const { loading } = useQuery(GET_ROOMS, {
    variables: { uid: Number(localStorage.getItem('userId')) },
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data.getRooms)
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
          rooms.map(({ rid, from, to, post, latestMessage, selected }) => {
            const user = to.uid == Number(localStorage.getItem('userId')) ? from : to;
            return (
              <div
                key={rid}
                onClick={() =>
                  dispatch({ type: 'SET_SELECTED_ROOM', payload: rid })
                }
                className={classNames(
                  'list-group-item list-group-item-action  rounded-0',
                  {
                    'active text-white': selected,
                  }
                )}
              >
                <div className="media"><img src={user.picture} alt="user" width="50" height="50" className="rounded-circle" />
                  <div className="media-body ml-4">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <h6 className="mb-0">{user.username}</h6>
                      {/* <small className="small font-weight-bold">14 Dec</small> */}
                    </div>
                    <p className="font-italic mb-0 text-small">
                      {latestMessage
                        ? latestMessage
                        : 'You are now connected!'}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MessageRooms
