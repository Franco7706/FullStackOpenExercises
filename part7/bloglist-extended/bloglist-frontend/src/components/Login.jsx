import { useNotificationDispatch, setNotificationWithTimeout } from "./NotificationContext"
import { useState } from "react"
import blogService from '../services/blogs'
import loginService from "../services/login"
import { useUserDispatch } from "./UserContext"
const Login = () => {
  const notificationDispatch = useNotificationDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userDispatch = useUserDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'SET', payload: user })
      setUsername('')
      setPassword('')
      notificationDispatch({ type: 'REMOVE' })
    } catch (exception) {
      setNotificationWithTimeout(notificationDispatch, {
        text: 'Wrong username or password',
        error: true,
      })
    }
  }

  return (
    <>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default Login
