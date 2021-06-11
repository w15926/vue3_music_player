import axios from 'axios'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: window.g.BASE_API,
  timeout: window.g.AXIOS_TIMEOUT
})

service.interceptors.request.use(
  config => {
    // if(getToken()) return config.headers['token'] = getToken
    return config
  },
  err => {
    console.log(err)
    return Promise.reject(error)
  }
)

// 另一种
// service.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })

service.interceptors.response.use(
  res => {
    if (res.status == 200) return res.data
    return Promise.reject('err')
  },
  err => {
    return Promise.reject(err)
  }
)

export default service