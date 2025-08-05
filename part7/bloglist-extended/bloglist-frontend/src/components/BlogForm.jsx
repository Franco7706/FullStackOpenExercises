import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { setNotificationWithTimeout, useNotificationDispatch } from './NotificationContext'
import { Input, Button } from '../styledElements'

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
        <table>
          <tbody>
            <tr>
              <td>
                <span>Title: </span>
              </td>
              <td>
                <Input
                  data-testid="title"
                  value={newBlog.title}
                  onChange={handleTitleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>Author: </span>
              </td>
              <td>
                <Input
                  data-testid="author"
                  value={newBlog.author}
                  onChange={handleAuthorChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>Url: </span>
              </td>
              <td>
                <Input
                  data-testid="url"
                  value={newBlog.url}
                  onChange={handleUrlChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        
        <Button type="submit" style={{margin: '10px 0px 10px 0px'}}>save</Button>
        
      </form>
    </>
  )
}

export default BlogForm
