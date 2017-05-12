import net from '@/util/net'
import server from '@/config/servers'
import storage from '@/util/storage'
import linq from 'linq'
import router from '@/config/router'
import app from '@/config/app'
import { Message } from 'element-ui'
// import message from '@/util/message'

export default {
  /**
   * 启动执行逻辑
   * @param {*} param
   */
  launch({ dispatch }) {
    Promise.all([
      // 更新用户信息
      dispatch('getUserInfo'),
      // 更新权限列表
      dispatch('updateRoleData'),
      // 更新类型字典
      dispatch('updateDictData')
    ]).then(
      // 生成用户数据
      () => {
        dispatch('generateUserData')
      }
    ).catch(ex => {
      console.log('系统初始化异常')
    })
  },
  /**
   * 生成用户数据
   * 生成用户权限数据
   * 生成用户菜单数据
   */
  async generateUserData({ getters, dispatch, commit }) {
    // 判断用户是否登陆
    // 未登录则停止
    if (!(getters.userToken)) {
      return
    }

    // 更新用户工作台数据
    dispatch('updateUserPlatformData')

    // 生成用户权限&菜单数据
    await dispatch('updateUserRole')
    await dispatch('updateUserMenu')
    dispatch('updateUserMessage')
    // 初始化用户消息
    dispatch('initMessageListener')
  },
  /**
   * 更新所有权限列表
   */
  async updateRoleData() {
    // 获取最新权限hash
    let currentRoleHash = await net.send({
      server: server.app.get_role_hash
    }).then(
      data => data
    )

    // 获取历史权限hash
    let lastRoleHash = storage.getItem('role_hash')
    let lastRoleData = storage.getItem('role_data')

    // 判断是否需要更新权限列表
    if (!lastRoleData || !lastRoleData || currentRoleHash.toString() !== lastRoleHash.toString()) {
      // 更新本地权限hash
      storage.setItem('role_hash', currentRoleHash)

      // 请求权限列表
      await net.send({
        server: server.app.get_role_data
      }).then(
        // 更新本地权限列表
        data => storage.setItem('role_data', data)
      )
    }
  },
  /**
   * 更新数据字典
   * @param {*} param
   */
  updateDictData({ state, commit, getters }) {
    let dictHash = storage.getItem('dict_hash')
    let dictData = storage.getItem('role_data')

    net.send({
      server: server.app.get_dict_hash
    }).then(
      hash => {
        if (!dictData || !dictHash || dictHash.toString() !== hash.toString()) {
          // 更新字典Hash
          storage.setItem('dict_hash', hash)
          // 请求权限列表
          net.send({
            server: server.app.get_dict_data
          }).then(
            // 更新本地权限列表
            data => storage.setItem('dict_data', data)
          )
        }
      }
    )
  },
  /**
   * 获取用户信息
   * 用于自动登录和刷新用户信息
   * 正常登录在用户登录时获取
   * 用户会话信息存储在sessionStorage
   * 自动登录用户信息存在在localStorage
   */
  async getUserInfo({ getters, commit }) {
    let userToken = getters.userToken
    if (!userToken) {
      userToken = localStorage.getItem('userToken')
      if (userToken) {
        sessionStorage.setItem('userToken', userToken)
      }
    }

    // 如果存在token,说明用户存在历史登陆，直接更新用户信息
    if (userToken) {
      await net.send({
        server: server.user.loginByToken,
        data: {
          token: userToken
        }
      }).then(
        data => {
          // 更新store用户信息
          commit('updateUserInfo', { user: data })
        },
        () => {}
      )
    }
  },
  /**
   * 更新用户权限
   * 根据用户角色更新用户权限
   */
  async updateUserRole({ commit, state, getters }) {
    if (!getters.userInfo.roles) {
      Message('')
      throw new Error('用户权限初始化异常')
    }
    // 获取权限信息
    let userRoleAarray = getters.userInfo.roles.map(c => c.roleId)
    let roleList = storage.getItem('role_data')

    // 获取用户权限对应资源
    let userRole = roleList.filter(c => {
      return linq.from(c.roles).any(item => userRoleAarray.includes(item.roleId))
    })

    storage.setItem('user_role_data', userRole.map(x => x.code).filter(x => x), storage.type.session)
    // 更新store用户权限列表
    commit('updateUserRole', userRole)
  },
  /**
   * 更新用户菜单
   */
  async updateUserMenu({ state, commit, getters, dispatch }) {
    if (!router.options.routes || !state.user_role) {
      Message('用户权限异常，请联系管理员')
      throw new Error('用户菜单初始化异常')
    }

    // 获取路由信息
    let routers = Array.from(router.options.routes)

    let codeList = state.user_role.filter(c => c.code).map(c => c.code)

    let fun = (data) => {
      for (let item of data) {
        // 判断权限
        if (codeList.includes(item.code) || item.code === '*') {
          item.role = true
          // 递归子节点
          item.children && fun(item.children)
        } else {
          item.role = false
        }
      }
    }
    // 遍历路由权限
    fun(routers)

    // 更新用户菜单数据
    commit('updateUserMenu', routers)

    dispatch('updateTabs')
    // 添加默认跳转
    // 第一个非空子项
    if (window.location.pathname === '/' || window.location.pathname === '/login') {
      let item = routers.find(c => c.role === true && c.children && c.children.length > 0 && c.children.some(c => c.hidden !== true && c.role === true))

      if (!item) {
        Message('用户权限异常，请联管理员')
        throw new Error('用户菜单权限异常')
      }

      let name = item.children.find(c => c.hidden !== true && c.role === true).name

      // 添加延迟后router跳转正常
      setTimeout(() => {
        router[router.currentRoute.fullPath === '/' ? 'replace' : 'push']({ path: name })
      }, 10)
    }
  },
  /**
   * 用户登录
   * @param {*} param
   * @param {*} autoLogin
   */
  userLogin({ state, commit, getters, dispatch }, { username, password, remember }) {
    return net.send({
      server: server.user.login,
      data: {
        username: username,
        password: password
      }
    }).then(
      // 登录成功
      async(data) => {
        // 存储会话用户信息
        storage.setItem('userToken', data.token, storage.type.session)
        // 更新srote登陆信息
        commit('updateUserInfo', data)
        // 生成用户数据
        dispatch('generateUserData')
        // 更新自动登录信息
        storage.setItem('userToken', data.token, storage.type.session)
        storage.setItem('userToken', data.token, storage.type.local)
        storage.setItem('userTokenExpired', new Date((+new Date()) + (1000 * 60 * 60 * 24 * 2)).valueOf(), storage.type.local) // 默认10天过期
        // 判断是否记住密码
        if (remember) {
          storage.setItem('account', {
            username: username,
            password: password
          }, storage.type.local)
        }
      },
      // 登录失败
      ({ reason }) => reason
    )
  },
  /**
   * 用户注销
   * @param {*} param
   */
  userLogout({ state, commit, getters }, redirect) {
    // 清除storage中用户信息
    storage.removeItem('userToken', storage.type.session)
    storage.removeItem('userToken', storage.type.local)
    storage.removeItem('userTokenExpired', storage.type.local)
    // 跳转到登录页面
    if (redirect) {
      router.go('login')
    } else {
      // 清除store中用户信息
      commit('clearUserInfo')
    }
  },
  /**
   * 获取用户工作台数据
   * @param {*} param
   * @param {*} redirect
   */
  updateUserPlatformData({ state, commit, getters }) {
    if (!getters.userToken) {
      return
    }

    // 更新工作台数据
    net.send({
      server: server.user.get_user_platform_data
    }).then(data => {
      commit('updateUserPlatformData', data)
    })
  },
  /**
   * 更新tabs
   */
  updateTabs({ commit }) {
    // 全局路由菜单
    let routes = router.options.routes

    // 当前选择菜单
    let target = linq.from(routes)
      .where(x => !x.hidden && x.role)
      .firstOrDefault(x => {
        if (x.children) {
          return linq.from(x.children)
            .any(c => c.path === router.currentRoute.path)
        }
      }, null)

    // 判断是否需要更新tabs
    if (target) {
      let tabs = target.children
        .filter(x => !x.hidden && x.role)
        .map(x => ({
          name: x.name,
          title: x.title,
          path: x.path
        }))

      commit('updateTabData', tabs)
    }
  },
  /**
   * 初始化消息监听
   * @param {*} param
   */
  initMessageListener({ state, commit, getters }) {
    // 实例化socket通讯对象
    let socket = new WebSocket(app.url.socket)
    let init = false

    // 建立连接回调
    socket.onopen = function () {
      console.log('weboscket连接建立成功')
    }

    // 接收消息回调
    socket.onmessage = function ({ data }) {
      if (init === false) {
        init = true
        socket.send(getters.userToken)
      } else {
        // 收到新消息
        try {
          let item = JSON.parse(data)
          console.log('socket', item)
          commit('receiveMessage', item)
        } catch (ex) {
          console.log('消息异常')
        }
      }
    }
  },
  updateUserMessage({ commit }) {
    // net.send({
    //   server: server.user.get_remindmessage_workbench
    // }).then((data) => {
    // let listenerType = [
    //   'REPAYMENT', // 还款提醒
    //   'FLLOWUP', // 跟进提醒
    //   'REPAIRED' // 修复提醒
    // ]
    // 获取前三条数据
    // let messages = content.filter(x => listenerType.includes(x.type))
    // let readList = linq.from(messages).where(x => x.state === 'Read').orderByDescending('$.createTime').toArray()
    // let unReadList = linq.from(messages).where(x => x.state === 'UnRead').orderByDescending('$.createTime').toArray()
    // let list = [...unReadList, ...readList]
    //   console.log(data)
    //   commit('updateUnReadeMessage', data.unReadeCount)
    //   commit('receiveMessage', { data: data.messageList.content })
    // }, err => {
    //   this.$message({
    //     type: 'info',
    //     message: err.reason
    //   })
    // })
  }
}
