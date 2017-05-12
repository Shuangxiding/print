const UserManage = resolve => require(['@/views/system-manage/UserManage'], resolve)
const RoleManage = resolve => require(['@/views/system-manage/RoleManage'], resolve)
const VersionControl = resolve => require(['@/views/system-manage/VersionControl'], resolve)

export default [
  {
    path: '/user-manage',
    name: 'user-manage',
    component: UserManage,
    title: '机构与用户管理',
    code: '0901FF'
  }, {
    path: '/role-manage',
    name: 'role-manage',
    component: RoleManage,
    title: '角色管理',
    code: '0902FF'
  }, {
    path: '/version-control',
    name: 'version-control',
    component: VersionControl,
    title: '版本控制',
    code: '0903FF'
  }]
