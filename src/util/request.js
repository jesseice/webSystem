import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { MessageBox } from 'element-ui'
let baseURL = process.env.VUE_APP_API_URL
if (process.env.VUE_APP_MODE === 'development') {
  //开发环境下的执行操作
} else if (process.env.VUE_APP_MODE === 'test') {
  //测试环境下的执行操作
}
const request = axios.create({
  baseURL,
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
  response = response.data
  if(response.code === 1004){
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