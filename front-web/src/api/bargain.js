import request from '@/utils/request'

const api = {
  list: '/bargain',
}

export default api

// 获取用户列表 parameter: { pageSize: 10, pageNo: 1 }
export function getUsers (parameter) {
  return request({
      url: api.list,
      method: 'get',
      params: parameter
  })
}