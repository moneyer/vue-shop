import request from '@/utils/request'

export function getRolesListApi() {
  return request({
    url: 'roles',
    method: 'get'
  })
}

export function deleteRightApi(roleId, rightId) {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

export function allotRightApi(roleId, data) {
  return request({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data
  })
}
