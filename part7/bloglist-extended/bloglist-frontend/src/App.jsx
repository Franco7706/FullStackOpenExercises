import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Users from './components/Users'
import Home from './components/Home'
import LoginData from './components/LoginData'
import { useUserDispatch, useUserValue } from './components/UserContext'
import User from './components/User'
import BlogPage from './components/BlogPage'

import blogService from './services/blogs'

import { useEffect } from 'react'

const App = () => {

  const padding = {
    padding: 5,
    color: 'black'
  }
  const colored = {
    backgroundColor: '#C7C8CA'
  }
  const userValue = useUserValue()
  const userDispatch = useUserDispatch()
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', payload: loggedUser })
      blogService.setToken(loggedUser.token)
    }
  }, [])

  return (
    <div>
      <Router>{userValue ?
        <div style={colored}>
          <Link style={padding} to="/">Blogs</Link>
          <Link style={padding} to="/users">Users</Link>
          <LoginData />
        </div>
        : null
      }
        <h2>Blog app</h2>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
