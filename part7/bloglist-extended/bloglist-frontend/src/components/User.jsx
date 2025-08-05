import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import userService from "../services/users"
const User = () => {
  const id = useParams().id
  const result = useQuery({
    queryKey: [`users`, id],
    queryFn: () => userService.getOne(id)
  })
  if (result.isLoading) {
    return <div>Loading data...</div>
  }
  const user = result.data
  if (!user) return null
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User