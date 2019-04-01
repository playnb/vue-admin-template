import req from './request'

export default {
  login: function(username, password) {
    return req({
      method: 'post',
      url: '/admin/login',
      data: {
        'user_name': username,
        'password': password
      }
    })
  },

  getInfo: function(accid) {
    return req({
      method: 'get',
      url: 'users/' + accid
    })
  }
}
