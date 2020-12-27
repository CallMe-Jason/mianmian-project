import request from '@/utils/request'

/**
 * 用户登录接口
 */
export const getMenus = () => {
  return request({
    method: 'GET',
    url: '/menus'
  })
}
