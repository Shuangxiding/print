import Mock from 'mockjs'
import mockData from '@/mock/data'
import app from '@/config/app'
import { getServerUrl } from '@/util/net'

// mock仅用于开发环境
const baseURL = app.url.dev
const mockMap = new Set()
/**
 * 开启数据MOCK
 * @param {*} d
 */
let runMock = list => {
  for (let item of Object.values(list)) {
    let { server, data } = item
    if (server) {
      let serverUrl = baseURL + getServerUrl(server)
      let serverType = (server.type || app.net.type).toLowerCase()

      if (mockMap.has(serverUrl + '@' + serverType)) {
        console.warn('存在重复的mockdata，请进行合并', serverUrl + '@' + serverType)
      } else {
        // 执行mock模拟数据
        Mock.mock(
          serverUrl, // url
          serverType, // rtype
          options => ({
            returnValue: 'SUCCESS',
            reason: '',
            success: true,
            object: data
          })
        )
      }
    } else if (item && typeof item === 'object') {
      runMock(item)
    }
  }
}

runMock(mockData)
