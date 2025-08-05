import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavBar, FullPage, Hover } from './styledElements'

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
    padding: '5px 10px 5px 10px',
    color: 'inherit',
    textDecoration: 'none',
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
    <FullPage>
      <Router>{userValue ?
        <NavBar>
          <Link style={padding} to="/"><Hover>Blogs</Hover></Link>
          <Link style={padding} to="/users"><Hover>Users</Hover></Link>
          <LoginData />
        </NavBar>
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
    </FullPage>
  )
}

export default App
