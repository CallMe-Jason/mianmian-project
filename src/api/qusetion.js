// 封装请求题目的模块

import request from '@/utils/request'

// 发送获取基础题库信息

export const getQusetionList = params => {
  return request({
    method: 'GET',
    url: '/questions',
    params
  })
}

// 删除基础题库
export const deleteQusetion = id => {
  return request({
    method: 'DELETE',
    url: `/questions/${id}`
  })
}

// 加入或移除精选
export const addChoice = (id, choiceState) => {
  return request({
    method: 'PATCH',
    url: `/questions/choice/${id}/${choiceState}`
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

// 获取基础题库详情
export const getBasicQusetion = id => {
  return request({
    method: 'GET',
    url: `/questions/${id}`
  })
}

// 获取企业列表

export const getCompany = () => {
  return request({
    method: 'GET',
    url: 'companys/simple'
  })
}

// 添加试题
export const addQusetion = data => {
  return request({
    method: 'POST',
    url: ' /questions',
    data
  })
}
