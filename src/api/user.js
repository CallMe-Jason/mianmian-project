import request from '@/utils/request'

/**
 * 用户登录接口
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/frame/login',
    data
  })
}

/**
 * 用户登录接口
 */
export const profile = () => {
  return request({
    method: 'POST',
    url: '/frame/profile'
  })
}
