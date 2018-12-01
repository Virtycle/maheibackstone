import axios from 'axios'
const myaxios = {}
myaxios.install = function (Vue) {
  // baseURL
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 为 axios 挂载 token 请求头，需要使用 request 拦截器实现
  axios.interceptors.request.use(function (config) {
    // 手动为 axios 的请求，追加 Authorization 请求头 
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  })
  Vue.prototype.$http = axios
}
export default myaxios