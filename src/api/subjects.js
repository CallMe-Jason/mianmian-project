import request from '@/utils/request'

export const getSubjectsList = params => {
  return request({
    method: 'GET',
    url: '/subjects',
    params
  })
}

export const addSubject = data => {
  return request({
    method: 'POST',
    url: '/subjects',
    data
  })
}

export const deleteSubject = id => {
  return request({
    method: 'DELETE',
    url: `/subjects/${id}`
  })
}

export const editSubject = (id, data) => {
  return request({
    method: 'PUT',
    url: `/subjects/${id}`,
    data
  })
}
