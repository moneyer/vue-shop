// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
  // return Cookies.get(TokenKey)
}

export function setToken(token) {
  return window.sessionStorage.setItem(TokenKey, token)
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return window.sessionStorage.clear()
  // return Cookies.remove(TokenKey)
}
