import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.interceptors.request.use(async (config) => {
  await new Promise<unknown>((resolve) => setTimeout(resolve, 2000))
  return config
})
