<template>
  <el-col class="box">
    <el-col :span="8" class="module">
      <el-row class="title">模块</el-row>
      <el-row class="module-tree">
        <el-tree align="left" :data="treeData" show-checkbox node-key="id" ref="tree" highlight-current :default-expanded-keys="treeExpanded" :default-checked-keys="treeDefaultSelection" @node-click="getCheckedNodes" :props="defaultProps">
        </el-tree>
      </el-row>
    </el-col>
    <el-col :span="16" class="function" min-width="290">
      <el-row class="title">对应模块功能</el-row>
      <el-row>
        <el-table :data="tableData" height="350" border ref="data-table" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60" align="center">
          </el-table-column>
          <el-table-column type="index" label="序号" width="70" align="center">
          </el-table-column>
          <el-table-column prop="name" label="功能名称" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="remark" label="描述" min-width="80" align="center">
          </el-table-column>
        </el-table>
      </el-row>
      <el-row class="btn-box">
        <el-button @click="saveModule">保存</el-button>
      </el-row>
    </el-col>
  </el-col>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import servers from '@/config/servers'
  import net from '@/util/net'

  export default {
    name: 'module-permission',
    computed: {
      moduleDialogShow: {
        get() {
          return this.$store.state.systemManage.module_permiss_dialog
        },
        set(value) {
          this.$store.commit('updateModuleDialog', value)
        }
      },
      module_permiss_roleId: {
        get() {
          return this.$store.state.systemManage.module_permiss_roleId
        },
        set(value) {
          this.$store.commit('updateModuleRoleId', value)
        }
      }
    },
    data() {
      return {
        // 服务接口列表
        server: {
          addRole: servers.SystemManage.resource_addRole,
          getRoleRes: servers.SystemManage.get_roleRes
        },
        allData: [],
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: [],
        multipleSelection: [],
        resoIds: [],
        nowResoId: null, // table展示的resoId
        tableResoIds: {},
        treeDefaultSelection: [], // tree默认选中
        tableDefaultSelection: [], // table默认选中
        treeExpanded: [], // tree默认展开
        moduleData: {}
      }
    },
    methods: {
      /**
       * 设置table默认选中
       */
      setDefaultSelection() {
        if (this.tableDefaultSelection && this.tableDefaultSelection.length) {
          this.$nextTick(() => {
            for (let item of this.tableDefaultSelection) {
              if (item) {
                this.$refs['data-table'].toggleRowSelection(this.tableData.find(d => d['resoId'] === item))
              }
            }
          })
        }
      },
      /**
       * 获取角色权限
       */
      getRoleRes() {
        net.send({
          server: this.server.getRoleRes,
          data: {
            roleId: this.module_permiss_roleId
          }
        }).then(data => {
          this.tableDefaultSelection = data.filter(v => v.filetype === 19).map(v => v.resoId)
          this.treeExpanded = data.filter(v => v.filetype === 17).map(v => parseInt(v.resoId))
          this.treeDefaultSelection = data.filter(v => v.filetype === 18).map(v => v.resoId)
          data.map(v => {
            if (v.filetype === 18) {
              let arr = data.filter(val => val.parentid === v.resoId).map(val => val.resoId)
              data.map(val => {
                if (val.parentid === v.resoId) {
                  arr.push(val.resoId)
                }
              })
              this.moduleData[v.resoId] = arr
            }
          })
          // 转化为树可用的数据
          this.allData = JSON.parse(localStorage.role_data)
          this.getTreeData()
        })
      },
      /**
       * 转化树数据
       */
      getTreeData() {
        let arr = [{
          id: 0,
          label: '催大人',
          pid: 1,
          children: []
        }]
        let num = 0
        this.allData.map(v => {
          if (v.parentid === '') {
            arr[0].children.push({
              id: parseInt(v.resoId),
              label: v.name,
              pid: parseInt(v.parentid),
              children: []
            })
            let funNum = 0
            this.allData.map(val => {
              if (val.parentid === v.resoId) {
                arr[0].children[num].children.push({
                  id: parseInt(val.resoId),
                  label: val.name,
                  pid: parseInt(val.parentid),
                  function: []
                })
                this.allData.map(value => {
                  if (value.parentid === val.resoId) {
                    arr[0].children[num].children[funNum].function.push(value)
                  }
                })
                funNum++
              }
            })
            num++
          }
        })
        this.treeData = arr
      },
      /**
       * 获取当前树选择项
       */
      getCheckedNodes(item) {
        console.log(item)
        if (item.id === this.nowResoId) {
          return
        }
        if (item.function) {
          if (this.nowResoId) {
            this.moduleData[this.nowResoId] = this.multipleSelection.map(v => {
              return v.resoId
            })
          }
          this.tableData = item.function
          this.setDefaultSelection()
          this.nowResoId = item.id
        }
      },
      /**
       * 获取当前选择项
       * 对外数据公开
       */
      getCurrentSelection() {
        return this.multipleSelection
      },
      /**
       * 处理当前选择项变化
       */
      handleSelectionChange(val) {
        this.multipleSelection = val.filter(v => v !== undefined)
      },
      /**
       * 保存点击
       */
      saveModule() {
        if (this.nowResoId) {
          this.moduleData[this.nowResoId] = this.multipleSelection.map(v => {
            return v.resoId
          })
        }
        let treePid = this.$refs.tree.getCheckedNodes().map(v => {
          return v.pid
        })
        let treeId = this.$refs.tree.getCheckedNodes().map(v => {
          return v.id
        })
        let treeAllId = treePid.concat(treeId)
        let treeResoId = []
        for (var i = 0; i < treeAllId.length; i++) {
          if ((treeResoId.indexOf(treeAllId[i]) === -1) && (treeAllId[i] !== '')) {
            treeResoId.push(treeAllId[i])
          }
        }
        let family = []
        for (let item in this.moduleData) {
          family = family.concat(this.moduleData[item])
        }
        family = family.concat(treeResoId).filter(x => x)

        let roleId = this.module_permiss_roleId
        net.send({
          server: this.server.addRole,
          data: {
            resoIds: family,
            roleId: roleId
          }
        }).then((data) => {
          // 更新数据信息
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.moduleDialogShow = false
        }, err => {
          this.$message({
            type: 'info',
            message: err.reason
          })
        })
      },
      /**
       * 刷新
       */
      refresh() {
        this.nowResoId = null
        this.multipleSelection = []
        this.tableData = []
        this.moduleData = {}
        // 获取角色权限
        this.getRoleRes()
      }
    },
    mounted() {
      // 获取角色权限
      this.getRoleRes()
    },
    components: {
      DataBox
    }
  }

</script>
<style scoped>
  .box {
    height: 500px;
    font-size: 0.75rem;
  }
  
  .title {
    height: 40px;
    background: #E4E4E4;
    line-height: 40px;
    text-align: center;
    border: 1px solid #dddddd;
    font-size: 0.875rem;
  }
  
  .module {
    height: 500px;
    border: 1px solid #dddddd;
    border-top: 0;
  }
  
  .module-tree {
    height: 460px;
    overflow: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
  }
  
  .module-tree::-webkit-scrollbar {
    width: 0px;
  }
  
  .btn-box {
    margin-top: 40px;
  }

</style>
