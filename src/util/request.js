import axios from 'axios'
import store from '@/store'
// import { Loading } from 'element-ui';
const request = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  timeout:10000
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

request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // if (/^2\d{2}$/.test(response.data.code)){
  //   response.status = 200
  // }else if(/^4\d{2}/.test(response.data.code)){
  //   response.status = 400
  // }
  response = response.data
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default request