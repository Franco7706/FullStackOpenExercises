import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content:content.field.value,
      author:author.field.value,
      info:info.field.value,
      votes: 0
    })
    navigate('/')
    props.setNotification(`a new anecdote ${content.value} created!`)
  }
  
  const resetValues = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.field}/>
        </div>
        <div>
          author
          <input {...author.field} />
        </div>
        <div>
          url for more info
          <input {...info.field} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={resetValues}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew