import { useUserValue, useUserDispatch } from "./UserContext"
import { useNotificationDispatch } from "./NotificationContext"
import blogService from "../services/blogs"

const LoginData = () => {
  const userValue = useUserValue()
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()
  
  if(userValue===null) return null

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({type: 'REMOVE'})
    blogService.setToken(null)
    notificationDispatch({ type: 'REMOVE' })
  }

  return(
      <>
        {userValue.name} logged in <button onClick={handleLogout}>logout</button>
      </>
  )
}

export default LoginData