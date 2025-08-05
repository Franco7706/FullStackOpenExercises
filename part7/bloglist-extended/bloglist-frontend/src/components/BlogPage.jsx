import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useNotificationDispatch, setNotificationWithTimeout } from "./NotificationContext"
import { useUserValue } from "./UserContext"
import blogService from "../services/blogs"
import { useNavigate, useParams } from 'react-router-dom'
import Notification from './Notification'
import { useState } from 'react'
import { Button, Input, ListDiv, ListItem } from '../styledElements'

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
      queryClient.invalidateQueries({ queryKey: ['blogs', id] })
      newComment.reset()
    },
    onError: (exception) => { printError(exception) }
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
    commentBlogMutation.mutate({ id: blog.id, text: commentText })
  }
  return (
    <div>
      <Notification />
      <h1>{blog.title}, by {blog.author}</h1>
      <ListDiv>
        <ListItem>URL: <a href={blog.url}>{blog.url}</a></ListItem>
        <ListItem>{blog.likes} likes <Button onClick={like}>like</Button></ListItem>
        <ListItem>Added by {blog.user.name}</ListItem>
      </ListDiv>
      {userValue.name === blog.user.name ? (
        <div>
          <Button onClick={remove}>remove</Button>
        </div>
      ) : null}
      <h3>Comments</h3>
      <div>
        <form onSubmit={createComment}>
          <Input {...newComment.input} />
          <Button type='submit'>add comment</Button>
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