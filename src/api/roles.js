import request from '@/utils/request'

export function getRolesList() {
  return request({
    url: 'roles',
    method: 'get'
  })
}

export function deleteRightById(roleId, rightId) {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
