import { useRef } from 'react'
import Togglable from './Togglable'
import List from './List'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Login from './Login'

import {
  useUserValue
} from '../components/UserContext'

const Home = () => {
  
  const userValue = useUserValue()


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
          <Togglable buttonLabel={'create new'} ref={blogFormRef}>
            <BlogForm togglableRef={blogFormRef} />
          </Togglable>
          <List />
        </div>
      )}
    </div>
  )
}

export default Home