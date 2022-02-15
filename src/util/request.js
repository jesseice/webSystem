import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://127.0.0.1:3000/'
})

request.interceptors.request.use(function (config) {
  const { token } = store.state
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default request