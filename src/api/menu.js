import request from '@/utils/request'

export function getMenuListApi() {
  return request({
    url: 'menus',
    method: 'get'
  })
}
