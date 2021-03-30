import request from '@/utils/request'

export function getUserList(queryInfo) {
  return request({
    url: 'users',
    method: 'get',
    params: queryInfo
  })
}

export function updateUserState(userInfo) {
  return request({
    url: `users/${userInfo.id}/state/${userInfo.mg_state}`,
    method: 'put'
  })
}

export function addUser(data) {
  return request({
    url: 'users',
    method: 'post',
    data
  })
}

export function getUserById(id) {
  return request({
    url: 'users/' + id,
    method: 'get'
  })
}

export function updateUserById(userInfo) {
  return request({
    url: 'users/' + userInfo.id,
    method: 'put',
    params: {
      email: userInfo.email,
      mobile: userInfo.mobile
    }
  })
}

export function deleteUserById(id) {
  return request({
    url: 'users/' + id,
    method: 'delete'
  })
}
