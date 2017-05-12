import storage from '@/util/storage'

let roleData

// 自定义指令
export const role = {
  bind(el, binding) {
    // 获取权限编码
    let roleCode = binding.expression

    // 验证权限码
    if (!roleCode) {
      console.error('未传入权限')
      return
    } else {
      try {
        roleCode = String.padStart(parseInt(roleCode).toString(16), 6, '0').toUpperCase()
      } catch (ex) {
        console.log('权限码格式错误')
        return
      }
    }

    // 初始化权限列表
    if (!roleData) {
      let userRoleData = storage.getItem('user_role_data', storage.type.session)
      if (userRoleData) {
        roleData = userRoleData
      } else {
        // TODO:待完善日志系统
        console.error('用户权限异常')
        return
      }
    }

    // 验证权限
    if (!roleData.includes(roleCode)) {
      el.style.display = 'none'
    }
  }
}
