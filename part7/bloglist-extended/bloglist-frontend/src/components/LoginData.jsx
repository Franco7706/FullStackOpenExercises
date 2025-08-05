import { useUserValue, useUserDispatch } from "./UserContext"
import { useNotificationDispatch } from "./NotificationContext"
import { Button } from "../styledElements"
import blogService from "../services/blogs"

const LoginData = () => {
  const userValue = useUserValue()
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()

  if (userValue === null) return null

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'REMOVE' })
    blogService.setToken(null)
    notificationDispatch({ type: 'REMOVE' })
  }
  const padding = {
    padding: '0rem 2rem',
    fontWeight: 'bold',
  }
  return (
    <>
      <span style={padding}>
        {userValue.name} logged in
      </span>
      <Button onClick={handleLogout}>logout</Button>
    </>
    )
}

export default LoginData