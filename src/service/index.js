import axios from 'axios'
import router from '@/router/index.js'
switch (process.env.NODE_ENV) {
  case 'development':
    axios.defaults.baseURL = 'http://121.89.205.189:3001/admin'
    break
  case 'production':
    axios.defaults.baseURL = 'http://121.89.205.189:3001/admin'
    break
}

axios.defaults.timeout = 10000
axios.defaults.withCredentials = false
// 设置请求之前的拦截器
axios.interceptors.request.use((config) => {
  let token = localStorage.getItem('token')
  token && (config.headers.token = token)
  return config
})

// 设置响应后的拦截器
axios.interceptors.response.use((response) => {
  // console.log('response----->', response)
  if (response.data?.data?.token) {
    localStorage.setItem('token', response.data.data.token)
  }
  // 全局提示框
  ElMessage({
    type: response.data?.code === '200' ? 'success' : 'error',
    message: response.data?.message
  })
  if (response.data?.code === '10119') {
    localStorage.removeItem('token')
    router.push({ name: 'login' })
  }
  return response.data
})

export default axios
