import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET':
      return action.payload.text
    case 'REMOVE':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch ] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value = {[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  return notificationDispatch
}



export default NotificationContext