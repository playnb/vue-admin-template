import axios from 'axios'
import store from '../store'
import auth from '@/utils/auth'

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
instance.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // console.debug('填充Token信息')
      config.headers['platform'] = 'web'
      config.headers['version'] = '1.0.0'
      const token = auth.getToken()
      if (token) {
        config.headers['accid'] = token.accid
        config.headers['token'] = token.token
      }
    }
    return config
  },
  error => {
    // Do something with request error
    console.debug(error) // for debug
    Promise.reject(error)
  }
)

// response拦截器
instance.interceptors.response.use(function(response) {
  if (response.status === 200) {
    console.debug(response)
  } else if (response.status === 401) {
    console.debug('没有权限')
    console.debug(response)
  }
  return response.data
}, function(error) {
  // 对响应错误做点什么
  console.debug(error)
  return Promise.reject(error)
})

export default function(req) {
  req.method = req.method.toLowerCase()
  if (req.method === 'post') {
    return instance.post(req.url, req.data)
  } else if (req.method === 'get') {
    return instance.get(req.url, { params: req.params })
  } else if (req.method === 'delete') {
    return instance.delete(req.url, { params: req.params })
  } else if (req.method === 'put') {
    return instance.put(req.url, req.data)
  } else if (req.method === 'patch') {
    return instance.patch(req.url, req.data)
  } else {
    console.error('未知的method' + req.method)
    return false
  }
}
