import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = async () => {
  const request = axios.get(baseURL)
  const response = await request
  return response.data
}

const create = async (newObject) => {
  const request = axios.post(baseURL, newObject)
  const response = await request
  return response.data
}

const remove = async (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  const response = await request
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject)
  const response = await request
  return response.data
}

export default { getAll, create, remove, update }