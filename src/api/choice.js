// 精选题库请求模块
import request from '@/utils/request'

// 获取精选题库列表
export const getChoiceList = params => {
  return request({
    method: 'GET',
    url: '/questions/choice',
    params
  })
}

// 精选题库上下架
export const getChoicePublish = (data) => {
  return request({
    method: 'POST',
    url: `/questions/choice/${data.id}/${data.publishState}`
  })
}

// 精选题库删除
export const deleteItem = id => {
  return request({
    method: 'DELETE',
    url: `/questions/${id}`
  })
}

// 组题列表
export const getRandomsList = () => {
  return request({
    method: 'GET',
    url: '/questions'
  })
}
// 试题审核
export const getChkState = (id, data) => {
  return request({
    method: 'POST',
    url: `/questions/check/${id}`,
    data
  })
}

// 获取学科数据
export const getSubjects = params => {
  return request({
    method: 'GET',
    url: '/subjects',
    params
  })
}

// 获取学科详情
export const getDirectorys = params => {
  return request({
    method: 'GET',
    url: '/directorys/simple',
    params
  })
}

// 获取标签
export const getTags = params => {
  return request({
    method: 'GET',
    url: '/tags/simple',
    params
  })
}

// 获取用户数据
export const getUser = () => {
  return request({
    method: 'GET',
    url: '/users/simple'
  })
}
