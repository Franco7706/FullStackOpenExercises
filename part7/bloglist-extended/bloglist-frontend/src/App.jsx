import { useEffect, useRef } from 'react'

import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginData from './components/LoginData'
import List from './components/List'

import blogService from './services/blogs'

import {
  useUserDispatch, useUserValue
} from './components/UserContext'


const App = () => {
  const userDispatch = useUserDispatch()
  const userValue = useUserValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', payload: loggedUser })
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const blogFormRef = useRef()

  return (
    <div>
      {userValue === null ? (
        <div>
          <Notification />
          <Login />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <LoginData />
          <Togglable buttonLabel={'create'} ref={blogFormRef}>
            <BlogForm togglableRef={blogFormRef} />
          </Togglable>
          <List />
        </div>
      )}
    </div>
  )
}

export default App
