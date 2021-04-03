import request from '@/utils/request'

export function getUserListApi(queryInfo) {
  return request({
    url: 'users',
    method: 'get',
    params: queryInfo
  })
}

export function updateUserStateApi(userInfo) {
  return request({
    url: `users/${userInfo.id}/state/${userInfo.mg_state}`,
    method: 'put'
  })
}

export function addUserApi(data) {
  return request({
    url: 'users',
    method: 'post',
    data
  })
}

export function getUserByIdApi(id) {
  return request({
    url: 'users/' + id,
    method: 'get'
  })
}

export function updateUserByIdApi(userInfo) {
  return request({
    url: 'users/' + userInfo.id,
    method: 'put',
    params: {
      email: userInfo.email,
      mobile: userInfo.mobile
    }
  })
}

export function deleteUserByIdApi(id) {
  return request({
    url: 'users/' + id,
    method: 'delete'
  })
}
