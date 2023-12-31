import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  if (error.response) {
    console.log(error.response.status)
    if (error.response.status === 401) {
      Message.error('token已失效，请重新登录！')
      // 提交清除的mutation，完成失效token的移除
      store.commit('user/logout')
      // 拦截到登录
      router.push('/login')
    } else {
      Message.error(error.response.data.message)
    }
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
