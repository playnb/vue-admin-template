import { logout } from '@/api/user'
import auth from '@/utils/auth'
import api from '@/api'

const user = {
  state: {
    token: auth.getToken(),
    userInfo: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  getters: {
    accid: state => state.userInfo.accid,
    token: state => state.token + 'XXXXXXX',
    avatar: state => state.userInfo.avatar,
    name: state => state.userInfo.name,
    roles: state => '管理员'
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        console.debug('actions:Login')
        console.debug(userInfo)
        api.user.login(username, userInfo.password).then(data => {
          console.debug(data.data.ok)
          if (data.data.ok === true) {
            console.debug('登录成功')
            console.debug(data.data.user_info)

            auth.setToken(data.data.user_info.accid, data.data.token)
            this.commit('SET_TOKEN', data.data.token)
            this.commit('SET_USER_INFO', data.data.user_info)
            resolve()
          } else {
            console.debug('登录失败')
            reject('Login Failed')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.debug('获取用户信息')
        api.user.getInfo(state.token).then(data => {
          if (data.data.user.accid && data.data.user.accid.toString() === auth.getAccid()) {
            this.commit('SET_USER_INFO', data.data.user)
          }
          resolve(data.data.user)
        }).catch(error => {
          console.debug(error)
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          this.commit('SET_TOKEN', '')
          this.commit('SET_USER_INFO', null)
          auth.removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        auth.removeToken()
        resolve()
      })
    }
  }
}

export default user
