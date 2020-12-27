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
 * 用户菜单
 */
export const getmenulists = () => {
  return request({
    method: 'GET',
    url: '/menus'
  })
}

/**
 * 用户权限
 */
export const UserJurisdiction = params => {
  return request({
    method: 'GET',
    url: '/permissions',
    params
  })
}
