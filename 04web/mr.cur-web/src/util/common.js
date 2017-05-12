import data from '@/assets/json/city.json'

export const RTYPE = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

const cache = new Map()

/**
 * 获取城市json
 */
export function getCityJson({ level, parentId: id = 1 } = {}) {
  // 无参数时level为0-不限制
  // 只传id时level默认为1
  level = (id !== 1 && level === undefined) ? 1 : (level || 0)

  // 检测缓存存在则不进行计算
  let key = [level, id].join(',')
  if (cache.has(key)) {
    return cache.get(key)
  }
  // 按照id和级别取城市数据
  let currentLevel = 0
  // 递归构建城市树
  let fun = ({ id }) => {
    currentLevel += 1
    // 判断当前导出级别
    if (level > 0 && currentLevel > level) {
      return
    }
    // 筛选子城市信息
    let children = data
      .filter(x => x.parentId === id)
      .map(c => {
        let childrens = fun(c)
        if (childrens && childrens.length > 0) {
          c.children = childrens
        }
        return c
      })

    if (children && children.length > 0) {
      return children
    }
  }

  let result = fun({ id })

  cache.set(key, result)

  return result
}
/**
 * 获取对应城市ID父节点列表
 * @param {*} id
 */
export function getCityParent(id) {
  let result = []
  // 获取对应ID节点
  let item = data.find(x => x.id === id)

  if (!item) return result

  // 向根节点遍历
  let fun = (itemId) => {
    let item = data.find(x => x.id === itemId)
    if (item && item.id !== 1) {
      result.unshift(item.id)
      fun(item.parentId)
    }
  }

  fun(item.id)

  return result
}

export function getCityName(citys, auto) {
  // 传递数组则直接返回名称
  // 传递数字则查询父元素
  if (typeof citys === 'number' || typeof citys === 'string') {
    if (auto) {
      citys = getCityParent(citys)
    } else {
      citys = [citys]
    }
  }

  let cityName = citys.map(x => {
    let city = data.find(c => c.id === x)
    return city ? city.areaName : ''
  })

  if (cityName.length === 1) {
    [cityName] = cityName
  }

  return cityName
}
/**
 * 校验最小值
 */
export function validateMin(brother) {
  return (rule, value, callback) => {
    if (value < 0) {
      callback(new Error('请输入正数'))
    }
    if ((value === '') || (brother === '')) {
      callback()
      return
    }
    if (value > brother) {
      callback(new Error('请输入正确的最小值'))
    } else {
      callback()
    }
  }
}
/**
 * 校验最大值
 */
export function validateMax(brother) {
  return (rule, value, callback) => {
    if (value < 0) {
      callback(new Error('请输入正数'))
    }
    if ((value === '') || (brother === '')) {
      callback()
      return
    }
    if (value < brother) {
      callback(new Error('请输入正确的最大值'))
    } else {
      callback()
    }
  }
}

/**
 * form手机号rules
 */
export function truePhoneRules(phone) {
  return { message: '请输入正确的手机号', trigger: 'blur', pattern: /^1(3|4|5|7|8)\d{9}$/ }
}

export function dateFormat(date, fmt) {
  // 如果是时间戳则转化为时间
  if (typeof date === 'number') {
    date = new Date(date)
  }

  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }

  return fmt
}

/**
 * 判断是否是日期类型
 * @param {*} date
 */
export function isDate(date) {
  return date && date instanceof Date
}

/**
 * 判断日期类型是日期还是日期时间
 * @param {*} date
 */
export function getDateType(date) {
  if (!isDate(date)) {
    return
  }

  return (date.getHours() === 0 &&
    date.getMinutes() === 0 &&
    date.getSeconds() === 0) ? 'date' : 'datetime'
}

export function sleep(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, time)
  })
}
/**
 * 下载文件
 */
export function downloadFile(url, filename) {
  let a = document.createElement('a')
  a.href = url
  a.download = filename || (+new Date())
  a.click()
}
