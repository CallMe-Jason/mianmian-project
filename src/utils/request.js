import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://hmmm-api.itheima.net/'
})

// 请求拦截器
request.interceptors.request.use(config => {
  // Do something before request is sent
  const {
    user
  } = store.state
  // console.log(user)
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

export default request
