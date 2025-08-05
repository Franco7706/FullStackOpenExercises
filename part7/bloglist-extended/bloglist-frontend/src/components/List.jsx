import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import { useUserValue } from './UserContext'

import { Link } from "react-router-dom"

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
  const bordered = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          //<Blog
          //  key={blog.id}
          //  blog={blog}
          ///>
          <div style={bordered} key={blog.id}><Link to={`/blogs/${blog.id}`} state={blog}>{blog.title} {blog.author}</Link></div>
        ))}

    </div>
  )
}
export default List