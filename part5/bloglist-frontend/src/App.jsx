import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { set } from 'mongoose'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(null)
    }
    catch (exception) {
      setMessage({ text: 'Wrong username or password', error: true })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
    setMessage(null)
  }

  const addBlog = async (newBlog) => {
    try {
      let createdBlog = await blogService.create(newBlog)
      createdBlog = {
        ...createdBlog,
        user: user
      }
      setBlogs(blogs.concat(createdBlog))
      setMessage({ text: `a new blog ${createdBlog.title} by ${createdBlog.author} added`, error: false })
      setTimeout(() => {setMessage(null)},5000)
      blogFormRef.current.toggleVisibility()
    }
    catch (exception){
      setMessage({ text: exception.response.data.error, error: true })
      setTimeout(() => {setMessage(null)},5000)
    }
  }
  const updateLikes = async blog => {
    try {
      const response = await blogService.update(blog)
    }
    catch (exception) {
      setMessage({ text: exception.response.data.error, error: true })
      setTimeout(() => {setMessage(null)},5000)
    }
  }
  const deleteBlog = async blog => {
    try {
      const response = await blogService.deleteB(blog)
      setMessage({ text: `Blog ${blog.title} by ${blog.author} deleted`, error: false })
      setTimeout(() => {setMessage(null)},5000)
      return true
    }
    catch (exception) {
      setMessage({ text: exception.response.data.error, error: true })
      setTimeout(() => {setMessage(null)},5000)
      return false
    }
  }
  const blogFormRef = useRef()
  const appContent = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel = {'create'} ref = {blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.toSorted((a,b) => b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes = {updateLikes} deleteBlog={deleteBlog} showDelete = {user.name===blog.user.name} />
      )}
    </div>
  )
  return (
    <div>
      {user === null ?
        <div>
          <Notification message={message} />
          <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
        </div>
        : appContent()}

    </div>
  )
}

export default App