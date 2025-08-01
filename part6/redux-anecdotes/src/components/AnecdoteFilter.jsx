import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default AnecdoteFilter