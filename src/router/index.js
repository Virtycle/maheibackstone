import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home.vue'
import Users from '../components/users/users.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home ,
      children :[
        {
          name: 'users',
          path: '/users',
          component: Users
        }
      ]
    }
  ]
})
// 路由导航守卫的语法   router对象.beforeEach((to, from, next) => {})
router.beforeEach((to, from, next) => {
  // 如果用户访问的是 登录页面，则直接放行
  if (to.path === '/login') return next()
  // 获取 token
  const tokenStr = sessionStorage.getItem('token')
  // 如果 token 存在， 直接放行
  if (tokenStr) return next()
  // 否则，强制跳转到登录页
  next('/login')
})

export default router
