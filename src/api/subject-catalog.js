import request from '@/utils/request'

// 请求列表数据
export const getDirectorysList = params => {
  return request({
    method: 'GET',
    url: '/directorys',
    params
  })
}
// 请求学科列表数据
export const getSubjectList = () => {
  return request({
    method: 'GET',
    url: '/subjects/simple',
  })
}
// 添加目录学科
export const addSubject = data => {
  return request({
    method: 'POST',
    url: '/directorys',
    data
  })
}
// 修改目录状态
export const changeSubjectState = target => {
  return request({
    method: 'POST',
    url: `/directorys/${target.id}/${target.state}`,
  })
}
// 目录详情
export const getSubjectDetails = target => {
  return request({
    method: 'GET',
    url: `/directorys/${target}`,
  })
}
// 提交修改请求
export const subSubject = (target, data) => {
  return request({
    method: 'PUT',
    url: `/directorys/${target}`,
    data
  })
}
// 删除目录请求
export const deleteSubjectItem = target => {
  return request({
    method: 'DELETE',
    url: `/directorys/${target}`,
  })
}