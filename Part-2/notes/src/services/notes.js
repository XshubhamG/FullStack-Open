import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const res = await request
  return res.data
}

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject)
  const res = await request
  return res.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const res = await request
  return res.data
}

export default { getAll, create, update }
