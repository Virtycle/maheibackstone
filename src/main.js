import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import moment from "moment"
import myaxios from "./plugins/myaxios"
import Mybread from './components/mybread.vue'
// Vue.use(axios) 错误示范
Vue.use(ElementUI)
Vue.use(myaxios)
// baseURL
// axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// // 为 axios 挂载 token 请求头，需要使用 request 拦截器实现
// axios.interceptors.request.use(function(config) {
//   // 手动为 axios 的请求，追加 Authorization 请求头 
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })

// Vue.prototype.$http = axios
Vue.component(Mybread.name, Mybread)
// 时间格式化
Vue.filter('formatDate', (v,formdate) => {
    return moment(v).format(formdate)
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: c => c(App)
})
