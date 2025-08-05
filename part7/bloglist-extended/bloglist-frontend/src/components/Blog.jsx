import { useState } from 'react'
import { setNotificationWithTimeout, useNotificationDispatch } from './NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useUserValue } from './UserContext'

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const userValue = useUserValue()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const printError = (exception) => {
    setNotificationWithTimeout(notificationDispatch, {
      text: exception.response.data.error,
      error: true,
    })
  }
  const updateLikeMutation = useMutation({
    mutationFn: blogService.update,
    // onSuccess: () => { setLikes(likes + 1) }, // i could invalidate queries here for the page to re-render and the blogs to be sorted again but it may be unnecessary
    onError: (exception) => {
      printError(exception)
      queryClient.invalidateQueries('blogs')
    }
  })
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteB,
    onSuccess: (blog) => {
      queryClient.invalidateQueries('blogs')
      setNotificationWithTimeout(notificationDispatch, {
        text: `Blog ${blog.title} by ${blog.author} deleted`,
        error: false,
      })
    },
    onError: (exception) => { printError(exception) }
  })
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const like = () => {
    updateLikeMutation.mutate({ ...blog, likes: likes + 1 })
    setLikes(likes + 1) // to make the response time slower for the like increase to show
    // if the result is not success the likes still increase but if there's an error probably the blog shouldn't even be there
  }
  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog)
    }
  }
  return (
    <div>
      <div style={blogStyle} data-testid="blog">
        <div>
          {' '}
          {blog.title} {blog.author}{' '}
          <button onClick={toggleVisibility}>
            {visible ? 'hide' : 'view'}
          </button>{' '}
        </div>
        {visible ? (
          <>
            <div> {blog.url}</div>
            <div>
              {' '}
              <span data-testid="likes"> {likes} </span>
              <button onClick={like}>like</button>{' '}
            </div>
            <div> {blog.user.name}</div>
            {userValue.name===blog.user.name ? (
              <div>
                {' '}
                <button onClick={remove}>remove</button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Blog
