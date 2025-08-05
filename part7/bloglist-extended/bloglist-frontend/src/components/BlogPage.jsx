import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useNotificationDispatch, setNotificationWithTimeout } from "./NotificationContext"
import { useUserValue } from "./UserContext"
import blogService from "../services/blogs"
import { useNavigate, useParams } from 'react-router-dom'
import Notification from './Notification'
import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (event) => {
    setValue('')
  }
  return {
    input: {
      type,
      value,
      onChange
    },
    reset
  }
}

const BlogPage = () => {
  const id = useParams().id
  const result = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogService.getOne(id)
  })

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const userValue = useUserValue()
  const navigate = useNavigate()
  const newComment = useField('text')

  const printError = (exception) => {
    setNotificationWithTimeout(notificationDispatch, {
      text: exception.response.data.error,
      error: true,
    })
  }
  const updateLikeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs', id] })
    },
    onError: (exception) => {
      printError(exception)
      queryClient.invalidateQueries({ queryKey: ['blogs', id] })
    }
  })
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteB,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs', id] })
      setNotificationWithTimeout(notificationDispatch, {
        text: `Blog ${blog.title} by ${blog.author} deleted`,
        error: false,
      })
      navigate('/')
    },
    onError: (exception) => { printError(exception) }
  })
  const commentBlogMutation = useMutation({
    mutationFn: blogService.postComment,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs', id]})
      newComment.reset()
    },
    onError: (exception) => { printError(exception)}
  })
  const blog = result.data
  if (!blog || !userValue) {
    return <div>Loading data...</div>
  }
  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog)
    }
  }
  const like = () => {
    updateLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }
  const createComment = (event) => {
    event.preventDefault()
    const commentText = newComment.input.value
    commentBlogMutation.mutate({id: blog.id, text: commentText})
  }
  return (
    <div>
      <Notification />
      <h1>{blog.title} {blog.author}</h1>

      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={like}>like</button></div>
      <div>Added by {blog.user.name}</div>
      {userValue.name === blog.user.name ? (
        <div>
          <button onClick={remove}>remove</button>
        </div>
      ) : null}
      <h3>comments</h3>
      <div>
        <form onSubmit={createComment}>
          <input {...newComment.input} />
          <button type='submit'>add comment</button>
        </form>
      </div>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogPage