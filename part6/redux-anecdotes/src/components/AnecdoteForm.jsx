import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value=''
    dispatch(createNewAnecdote(content))
    dispatch(setNotification(`you created the anecdote '${content}'`,5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit = {addAnecdote} >
        <div><input name = "content" /></div>
        <button type = "submit" >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm