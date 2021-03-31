import request from '@/utils/request'

export function getReportsData() {
  return request({
    url: 'reports/type/1',
    method: 'get'
  })
}
