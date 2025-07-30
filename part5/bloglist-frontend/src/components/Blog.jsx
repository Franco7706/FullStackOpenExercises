import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, showDelete }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const like = () => {
    updateLikes({ ...blog, likes: likes + 1 })
    setLikes(likes + 1)
  }
  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      if (await deleteBlog(blog)) {
        setDeleted(true)
      }
    }
  }
  if (deleted) {
    return null
  }
  return (
    <div>
      <div style={blogStyle}>
        <div> {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button> </div>
        {visible ?
          <>
            <div> {blog.url}</div>
            <div> {likes} <button onClick={like}>like</button> </div>
            <div> {blog.user.name}</div>
            {showDelete ? <div> <button onClick={remove}>remove</button></div> : null}
          </> : null
        }
      </div>
    </div>

  )
}

export default Blog