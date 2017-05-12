import Vue from 'vue'
import Router from 'vue-router'
import storage from '@/util/storage'
import store from '@/store'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/404.vue'
import MenuRouter from '@/config/router/menu'

// 按需加载页面
const AccCenter = resolve => require(['@/views/acc-manage/AccCenter'], resolve)

// 安装路由插件
Vue.use(Router)

// 菜单配置
const WorkRouter = [
  {
    path: '/acc-center/:type/:caseId/:caseNum/:custId',
    name: 'acc-center',
    component: AccCenter,
    title: '催收管理',
    hidden: true
  }
]

// 路由配置表
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: '',
      component: Login,
      hidden: true
    },
    // 主页默认配置
    {
      path: '/',
      component: Home,
      hidden: true
    },
    ...MenuRouter,
    ...WorkRouter,
    {
      path: '*',
      hidden: true,
      component: NotFound
    }
  ]
})

// 路由检测
router.beforeEach(async(to, from, next) => {
  // 注销验证
  if (to.path === '/login') {
    // 清除登录状态
    await store.dispatch('userLogout')
    next()
  } else {
    let token = sessionStorage.getItem('userToken')

    // 验证自动登录
    if (!token) {
      let userToken = storage.getItem('userToken', storage.type.local)
      let userTokenExpired = storage.getItem('userTokenExpired', storage.type.local)
      if (userToken && userTokenExpired && (userTokenExpired - new Date().valueOf()) > 0) {
        token = userToken
      }
    }

    // 路由验证
    if (!token) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

export default router
