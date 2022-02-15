import axios from 'axios'
const baseUrl = '/api/blogs'

export const getAll = async () => {
  try {
    const res = await axios.get(baseUrl)
    if (res.status === 200) {
      return res.data
    }
  } catch (err) {
    console.log(err)
  }
}

export const createOne = async (blog, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const res = await axios.post(baseUrl, blog, config)
    if (res.status === 201) {
      return res.data
    }
  } catch (err) {
    console.log(err)
  }
}

export const newComment = async (comment, blogId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const res = await axios.post(`${baseUrl}/${blogId}/comments`, comment, config)
    if (res.status === 201) {
      return res.data
    }
  } catch (err) {
    console.log(err)
  }
}

export const editBlog = async (blog, id) => {
  try {
    const res = await axios.put(`${baseUrl}/${id}`, blog)
    if (res.status === 200) {
      return res.data
    }
  } catch (err) {
    console.log(err)
  }
}

export const deleteBlog = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const res = await axios.delete(`${baseUrl}/${id}`, config)
    if (res.status === 204) {
      return id
    }
  } catch (err) {
    console.log(err)
  }
}
