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

/**
 * 用户列表数据接口
 */
export const getUserInfo = params => {
  return request({
    method: 'GET',
    url: '/users',
    params
  })
}

/**
 * 添加用户数据接口
 */
export const addUserInfo = data => {
  return request({
    method: 'POST',
    url: '/users',
    data
  })
}

/**
 * 删除用户数据接口
 */
export const removeUserInfo = target => {
  return request({
    method: 'DELETE',
    url: `/users/${target}`,
    target
  })
}

/**
 * 用户详情信息接口
 */
export const detailUserInfo = target => {
  return request({
    method: 'GET',
    url: `/users/${target}`
  })
}

/**
 * 修改用户信息接口
 */
export const dlterUserInfo = (target, data) => {
  return request({
    method: 'PUT',
    url: `/users/${target}`,
    data
  })
}
