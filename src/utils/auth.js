import Cookies from 'js-cookie'

const TokenKey = 'ztcommunity_admin_token'
const AccidKey = 'ztcommunity_admin_accid'

export function getToken() {
  const token = Cookies.get(TokenKey)
  const accid = Cookies.get(AccidKey)
  if (token && accid) {
    return { 'token': token, 'accid': accid }
  }
  return undefined
}

export function setToken(accid, token) {
  Cookies.set(TokenKey, token)
  Cookies.set(AccidKey, accid)
}

export function removeToken() {
  Cookies.remove(TokenKey)
  Cookies.remove(AccidKey)
}
