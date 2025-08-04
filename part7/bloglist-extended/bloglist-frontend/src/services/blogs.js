import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (updatedBlog) => {
  const url = `${baseUrl}/${updatedBlog.id}`;
  const response = await axios.put(url, updatedBlog);
  return response.data;
};

const deleteB = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const url = `${baseUrl}/${blog.id}`;
  const response = await axios.delete(url, config);
  return response.data;
};

export default { getAll, setToken, create, update, deleteB };
