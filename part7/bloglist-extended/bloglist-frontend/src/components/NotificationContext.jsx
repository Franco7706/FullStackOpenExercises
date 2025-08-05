import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
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

export const setNotificationWithTimeout = (dispatch,notification) => {
  dispatch({ type: 'SET', payload: notification })
  setTimeout(() => dispatch({ type: 'REMOVE' }), 5000)
}

export default NotificationContext
