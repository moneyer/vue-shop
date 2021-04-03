import request from '@/utils/request'

export function getRightsListApi(type) {
  return request({
    url: `rights/${type}`,
    method: 'get'
  })
}
