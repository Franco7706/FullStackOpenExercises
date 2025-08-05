import { useUserValue, useUserDispatch } from "./UserContext"
import { useNotificationDispatch } from "./NotificationContext"
import blogService from "../services/blogs"

const LoginData = () => {
  const userValue = useUserValue()
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({type: 'REMOVE'})
    blogService.setToken(null)
    notificationDispatch({ type: 'REMOVE' })
  }

  return(
      <p>
        {userValue.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
  )
}

export default LoginData