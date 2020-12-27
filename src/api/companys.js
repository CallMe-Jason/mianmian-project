import request from '@/utils/request'

/**
 * 获取企业管理列表
 */
export const getCompanys = params => {
  return request({
    method: 'GET',
    url: '/companys',
    params
  })
}

/**
 * 企业管理设置状态
 */
export const updateCompanyState = data => {
  return request({
    method: 'POST',
    url: `/companys/${data.id}/${data.state}`
  })
}

/**
 * 企业管理添加
 */
export const addCompany = data => {
  return request({
    method: 'POST',
    url: '/companys',
    data
  })
}

/**
 * 企业管理添加
 */
export const getCompanyId = id => {
  return request({
    method: 'GET',
    url: `/companys/${id}`
  })
}

/**
 * 企业管理修改
 */
export const UpdateCompanyId = (id, data) => {
  return request({
    method: 'PUT',
    url: `/companys/${id}`,
    data
  })
}

/**
 * 企业管理修改
 */
export const removeCompanyId = id => {
  return request({
    method: 'DELETE',
    url: `/companys/${id}`
  })
}
