/**
 * Created by jiachenpan on 16/11/18.
 */

export default {
  isvalidUsername: function(str) {
    const valid_map = ['admin', 'editor', 'ltp']
    return valid_map.indexOf(str.trim()) >= 0
  },
  isvalidPassword: function(str) {
    return str.length >= 5
  }

}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
