// 对复杂数据存储进行封装
/**
 * 获取当前存储类型对象
 * @param {*} type
 */
function getStorage(type) {
  switch (type) {
    case 'local':
      return localStorage
    case 'session':
      return sessionStorage
    default:
      return sessionStorage
  }
}

export default {
  /* 数据存储
   * @param { String } key
   * @param { Object } value
   * @param { Object } extend 数据扩展标识
   */
  setItem(key, value, type = 'local') {
    // key必须为字符串
    if (!key || typeof key !== 'string') {
      console.log('key参数错误.')
      return
    }

    let data
    // 取消对扩展的支持
    // 统一将数据转换为json格式进行存储
    if (value === undefined) {
      // 返回空数据
      data = JSON.stringify()
    } else if (typeof value === 'object') {
      data = JSON.stringify(value)
    } else {
      data = value
    }

    getStorage(type).setItem(key, data)
  },
  /**
   * 获取存储数据
   * @param {Object} key
   */
  getItem: function (key, type = 'local') {
    if (!key || typeof key !== 'string') {
      console.log('key参数错误.')
      return
    }

    let data = getStorage(type).getItem(key)

    // 统一讲数据转换为json格式进行存储
    try {
      if (data !== '' && data !== undefined) {
        return JSON.parse(data)
      } else {
        return ''
      }
    } catch (ex) {
      return data
    }
  },
  /**
   * 删除数据对象
   * @param {Object} key
   */
  removeItem: function (key, type = 'local') {
    let storage = getStorage(type)
    storage.removeItem(key)
  },
  type: {
    local: 'local',
    session: 'session'
  }
}
