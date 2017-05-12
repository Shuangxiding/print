import storage from '@/util/storage'
import linq from 'linq'
import { getCityName } from '@/util/common'

let TypeCodeData // 缓存字典数据

/**
 * 字典数据转换器
 * @param {*} id
 * @param {*} code
 */
export function typeCodeConvert(id, ...code) {
  if (!code) return ''

  if (!TypeCodeData) {
    // TODO:storage执行效率待确认
    TypeCodeData = storage.getItem('dict_data')
  }

  let item = linq.from(TypeCodeData)
    .where(x => code.length > 0 ? code.includes(x.typeCode) : true)
    .singleOrDefault(x => x.id === id, '')

  if (item) {
    return item.name
  }
}
/**
 * 手机号脱敏显示转换器
 */
export function encryptPhone(value) {
  if (!value || value === '') {
    return ''
  }
  return value.substr(0, 3) + '****' + value.substr(7)
}

/**
 * 客户姓名脱敏显示转换器
 */
export function encryptName(value) {
  if (!value || value === '') {
    return ''
  }
  return value.replace(value.charAt(1), '*')
}

/**
 * 身份证脱敏显示转换器
 */
export function encryptIDCard(value) {
  if (!value || value === '') {
    return ''
  }
  // return value.substr(0, 3).padEnd(value.length - 4, '*') + value.substr(-4)
  return value.substr(0, 3) + '****' + value.substr(-4)
}

/**
 * 转换为字符串
 */
export function toString(value) {
  return value.toString ? value.toString() : value
}

export function reminderTypeConvert(value) {
  let reminderType = {
    'REPAYMENT': '还款提醒',
    'FLLOWUP': '跟进提醒',
    'REPAIRED': '修复提醒'
  }
  return reminderType[value]
}

export function cityConvert(cityCode, auto) {
  if (!cityCode) {
    return ''
  }

  if (cityCode instanceof Array) {
    cityCode = cityCode.filter(x => x)
    if (cityCode.length < 1) {
      return ''
    }
  }

  let name = getCityName(cityCode, auto)

  if (name instanceof Array) {
    return name.join('')
  } else {
    return name
  }
}

export function ellipsis(value, length) {
  if (!value) {
    return ''
  }

  let data = value.trim()
  if (data.length <= length) {
    return data
  } else {
    return data.substr(0, length) + '...'
  }
}
