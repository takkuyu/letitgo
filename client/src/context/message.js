import React, { createContext, useReducer, useContext } from 'react'

const MessageStateContext = createContext()
const MessageDispatchContext = createContext()

const messageReducer = (state, action) => {
  let roomsCopy, roomIndex
  const { rid, message, messages } = action.payload
  switch (action.type) {
    case 'SET_ROOMS':
      return {
        ...state,
        rooms: action.payload
      }
    case 'SET_SELECTED_ROOM':
      return {
        ...state,
        rooms: state.rooms.map((room) => ({
          ...room,
          selected: room.rid === action.payload,
        }))
      }
    case 'SET_ROOM_MESSAGES':
      roomsCopy = [...state.rooms]

      roomIndex = roomsCopy.findIndex((room) => room.rid === rid)

      roomsCopy[roomIndex] = { ...roomsCopy[roomIndex], messages }

      return {
        ...state,
        rooms: roomsCopy,
      }
    case 'ADD_MESSAGE':
      roomsCopy = [...state.rooms]

      roomIndex = roomsCopy.findIndex((room) => room.rid === rid)

      if (roomIndex === -1) return state

      const newRoom = {
        ...roomsCopy[roomIndex],
        messages: roomsCopy[roomIndex].messages
          ? [...roomsCopy[roomIndex].messages, message]
          : null,
        latestMessage: message.content,
      }

      roomsCopy[roomIndex] = newRoom

      return {
        ...state,
        rooms: roomsCopy,
      }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, { rooms: null })

  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  )
}

export const useMessageState = () => useContext(MessageStateContext)
export const useMessageDispatch = () => useContext(MessageDispatchContext)
