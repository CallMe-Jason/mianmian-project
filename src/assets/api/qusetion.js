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
