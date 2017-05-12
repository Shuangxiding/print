import storage from '@/util/storage'
import linq from 'linq'

let TypeCodeDict

/**
 * 字典数据转换器
 * @param {*} id
 * @param {*} code
 */
export function getTypeCode(...code) {
  if (!code) return ''

  if (code.length === 1) {
    [code] = code
  }
  // 生成类型字典
  if (!TypeCodeDict) {
    // 初始化字典
    TypeCodeDict = new Map()
    let dictData = storage.getItem('dict_data')
    let dictGroup = linq.from(dictData).groupBy('$.typeCode').toArray()
    for (let group of dictGroup) {
      TypeCodeDict.set(group.key(), linq.from(group.getSource()).orderBy('$.sort').toArray())
    }
  }
  return typeof code === 'string' ? TypeCodeDict.get(code) : code.map(item => TypeCodeDict.get(item)).reduce((a, b) => [...a, ...b], [])
}

export function reset(vm) {
  if (vm) {
    Object.assign(vm.$data, vm.$options.data())
  }
}

export default {
  install: function (Vue, options) {
    // 添加实例方法
    Vue.prototype.$helper = {
      getTypeCode,
      reset: function () {
        console.log(options)
      }
    }
    // 对象重置方法
    Vue.prototype.$reset = function (obj) {
      if (obj) {
        for (let key in obj) {
          switch (typeof obj[key]) {
            case 'object':
              {
                if (obj[key] instanceof Array) {
                  obj[key] = []
                  break
                }
                if (obj[key] instanceof Object) {
                  obj[key] = {}
                  break
                }
                break
              }
            default:
              {
                obj[key] = ''
              }
          }
        }
      } else {
        Object.assign(this.$data, this.$options.data())
      }
    }
  }
}
