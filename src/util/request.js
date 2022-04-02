import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { MessageBox } from 'element-ui'
const request = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  timeout:10000
})


request.interceptors.request.use( config => {

  const { token } = store.state
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use( response => {
  // if (/^2\d{2}$/.test(response.data.code)){
  //   response.status = 200
  // }else if(/^4\d{2}/.test(response.data.code)){
  //   response.status = 400
  // }
  response = response.data
  if(response.code === 1004){
    // Message.error('未登录,自动跳转')
    MessageBox.confirm('未登录，是否立即跳转登录页?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '稍后',
      type: 'warning',
      center: true
    }).then(() => {
      router.push('/login')
    }).catch(() => {
    })
  }
  return response;
},  error => {
  return Promise.reject(error);
});

export default request