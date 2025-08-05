import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { setNotificationWithTimeout, useNotificationDispatch } from './NotificationContext'

const BlogForm = ({ togglableRef }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blog) => {
      queryClient.invalidateQueries('blogs')
      setNotificationWithTimeout(notificationDispatch, {
        text: `a new blog ${blog.title} by ${blog.author} added`,
        error: false,
      })
      togglableRef.current.toggleVisibility()
    },
    onError: (exception) => {
      console.log(exception)
      setNotificationWithTimeout(notificationDispatch, {
        text: exception.response.data.error,
        error: true,
      })
    }
  })
  const notificationDispatch = useNotificationDispatch()
  const createBlog = async (blog) => {
    newBlogMutation.mutate(blog)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ ...newBlog })
    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleTitleChange = ({ target }) => {
    const replaceBlog = {
      ...newBlog,
      title: target.value,
    }
    setNewBlog(replaceBlog)
  }
  const handleAuthorChange = ({ target }) => {
    const replaceBlog = {
      ...newBlog,
      author: target.value,
    }
    setNewBlog(replaceBlog)
  }
  const handleUrlChange = ({ target }) => {
    const replaceBlog = {
      ...newBlog,
      url: target.value,
    }
    setNewBlog(replaceBlog)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            data-testid="title"
            value={newBlog.title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            data-testid="author"
            value={newBlog.author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            data-testid="url"
            value={newBlog.url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default BlogForm
