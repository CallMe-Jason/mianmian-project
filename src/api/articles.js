import request from '@/utils/request'

/**
 * 获取文章列表
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/articles',
    params
  })
}

/**
 * 文章添加
 */
export const addArticle = data => {
  return request({
    method: 'POST',
    url: '/articles',
    data
  })
}

/**
 * 获取文章详情
 */
export const getArticleId = id => {
  return request({
    method: 'GET',
    url: `/articles/${id}`
  })
}

/**
 * 文章编辑
 */
export const updateArticle = (id, data) => {
  return request({
    method: 'PUT',
    url: `/articles/${id}`,
    data
  })
}

/**
 * 文章状态
 */
export const updateArticleState = (id, state) => {
  return request({
    method: 'POST',
    url: `/articles/${id}/${state}`
  })
}

/**
 * 文章删除
 */
export const deleteArticle = id => {
  return request({
    method: 'DELETE',
    url: `/articles/${id}`
  })
}
