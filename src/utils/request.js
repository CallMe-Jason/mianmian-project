// 封装axios请求模块
import axios from 'axios'

// 创建一个axios实例
const request = axios.create({
  // 基础路径
  baseURL: 'http://hmmm.itheima.net/'
})
