import axios from 'axios'
import app from '@/config/app'
import store from '@/store'
import { Message } from 'element-ui'
import { getDateType, dateFormat } from '@/util/common'
// 请求配置
const instance = axios.create({
  baseURL: app.url.server,
  timeout: app.net.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// var requestArray = []

/**
 * 获取请求地址
 * @param {any} { service, controller, action, url }
 * @returns url
 */
export function getServerUrl({ service, controller, action, url }, method, append, data) {
  let dataPostfix = ''
  let appendPostfix = ''
  let postfixMethod = ['GET', 'DELETE']

  // 判断是否需要拼接后缀
  if (method && data && Object.keys(data).length > 0 && postfixMethod.includes(method)) {
    let postfixArray = []
    for (let [key, value] of Object.entries(data)) {
      if (value !== '' && value !== undefined) {
        postfixArray.push(key + '=' + value)
      }
    }
    let postfix = postfixArray.join('&')
    if (postfix.length > 0) {
      dataPostfix = '?' + postfix
    }
  }

  // 生成追加数据
  if (append && append.length) {
    appendPostfix = '/' + ((typeof append === 'string') ? append : append.join('/'))
  }

  // 自定义url优先级最高
  if (url) return `${url}${appendPostfix}${dataPostfix}`

  // 进行url拼接
  if (service && controller) {
    return `/${service}/api/${controller}${(action ? '/' + action : '')}${appendPostfix}${dataPostfix}`
  } else {
    throw new Error('server配置异常,请检查对应server配置')
  }
}

// function addSendTime(url, now) {
//   if (requestArray.find(x => x.url === url && now - x.time < 1000)) {
//     console.log(url)
//     throw new Error('阻止重复进行网络通讯')
//   } else {
//     requestArray.push({
//       url,
//       time: now
//     })
//     setTimeout(() => {
//       clearSendTime(url, now, 1)
//     }, 2000)
//   }
// }

// function clearSendTime(url, now, d) {
//   if (requestArray.find(x => x.url === url && x.time === now)) {
//     requestArray = requestArray.filter(x => x.url !== url && x.time !== now)
//   }
// }

/**
 * 格式化
 */
function dataFormat(data, fmt) {
  if (!data) {
    return
  }

  // 日期转换格式列表
  let dateType = {
    date: 'yyyy-MM-dd',
    datetime: 'yyyy-MM-dd hh-mm-ss'
  }

  // 转换日期类型
  let dateConvert = (key, value, type) => {
    type = type || getDateType(value)
    let formatTemp = dateType[type]
    if (formatTemp) {
      data[key] = dateFormat(value, formatTemp)
    }
  }

  // 获取格式化数组
  let keys = fmt ? Object.keys(fmt) : []

  // 数据格式化
  for (let [key, value] of Object.entries(data)) {
    // 日期格式化
    if (keys.includes(key) && value.type) {
      dateConvert(key, value, value.type)
    } else {
      dateConvert(key, value)
    }
  }
}

/**
 * 发送请求信息
 * @param {any} { server, data ,format }
 * format:{
 *  date:{
 *    type:'date'|'datetime'
 *  }
 * }
 * @returns
 */
function send({ server = {}, data, append, format, loading } = {}) {
  data = Object.assign({}, data)
  // TODO:应该每次仅在登陆注销时修改
  let userToken = store.getters.userToken
  if (userToken) {
    instance.defaults.headers['X-UserToken'] = userToken
  }

  // 获取通讯类型
  let { type: method = app.net.type } = server

  // 对数据进行预格式化
  dataFormat(data, format)

  // 获取通讯地址
  let url = getServerUrl(server, method, append, data)
  // let now = +new Date()
  // addSendTime(url, now)

  // 异步通讯进程
  // 目的是对请求结果进行预处理
  let promise = new Promise(async function (resolve, reject) {
    if (loading) {
      loading.state = true
    }

    let result = await instance
      .request({
        method,
        url,
        data
      })
      .then(response => {
        if (loading && loading.state) {
          loading.state = false
        }
        return response.data
      })
      .catch(({ response }) => {
        if (loading && loading.state) {
          loading.state = false
        }
        // console.log(response)
        switch (response.status) {
          case 403:
            {
              Message('用户登录状态过期，请重新登陆')
              // 用户token异常
              setTimeout(() => {
                store.dispatch('userLogout', true)
              }, 2000)
              break
            }
        }

        // 输出异常
        console.error(url, response.data.message)

        return {
          errors: response.data.errors,
          reason: '服务系统异常,请联系管理员或稍后重试',
          sucess: false
        }
      })
    // TODO:便于测试简单显示结果，待优化
    // console.group(url)
    // console.log(result)
    // console.groupEnd()
    // 处理返回结果
    // setTimeout(() => {
    //   clearSendTime(url, now)
    // }, 500)

    if (result && result.success) {
      resolve(result.object)
    } else {
      console.log(result)
      reject(result)
    }
  })

  return promise
}

/**
 * 批量发送请求
 * @param {*} servers
 */
function sendAll(servers) {
  if (servers instanceof Array) {
    let promises = servers.map(x => send(x))
    return Promise.all(promises)
  }
}

export default {
  send, // 发送请求
  sendAll // 批量发送请求
}
