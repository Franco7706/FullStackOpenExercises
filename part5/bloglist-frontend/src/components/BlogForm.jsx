import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ ...newBlog })
    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleTitleChange =({ target }) => {
    const replaceBlog = {
      ...newBlog,
      title: target.value
    }
    setNewBlog(replaceBlog)
  }
  const handleAuthorChange = ({ target }) => {
    const replaceBlog = {
      ...newBlog,
      author: target.value
    }
    setNewBlog(replaceBlog)
  }
  const handleUrlChange = ({ target }) => {
    const replaceBlog = {
      ...newBlog,
      url: target.value
    }
    setNewBlog(replaceBlog)
  }
  return(
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            value={newBlog.title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
        author:
          <input
            value={newBlog.author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url:
          <input
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