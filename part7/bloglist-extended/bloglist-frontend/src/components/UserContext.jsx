import { createContext, useReducer, useContext } from 'react'

const UserReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(
    UserReducer,
    null
  )

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const [user, userDispatch] = useContext(UserContext)
  return user
}

export const useUserDispatch = () => {
  const [user, userDispatch] = useContext(UserContext)
  return userDispatch
}
