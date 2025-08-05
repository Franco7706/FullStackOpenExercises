import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import { useUserValue } from './UserContext'
const List = () => {
  const userValue = useUserValue()
  
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  if (result.isLoading && userValue!==null) {
    return <div>loading data</div>
  }
  const blogs = result.data
  return (
    <div>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}

    </div>
  )
}
export default List