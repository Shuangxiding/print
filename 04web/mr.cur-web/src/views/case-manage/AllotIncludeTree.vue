<template>
  <el-col>
    <el-col :span="6" style="min-height:400px">
      <el-tree align="left" :data="treeData" node-key="deptId" ref="tree" highlight-current @node-click="getCheckedNodes" :props="defaultProps" style="min-height:400px">
      </el-tree>
    </el-col>
    <el-col :span="18">
      <data-box ref="databox" :params="params" :defaultParams="defaultParams" :server="server.queryDeptRoleUser" row-key="userId" :maxHeight="310">
        <!--输入区域 -START-->
        <template slot="input">
          <el-form-item label="姓名">
            <el-input v-model="params.realName"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-input v-model="params.roleName"></el-input>
          </el-form-item>
        </template>
        <!--输入区域 -END-->
        <!--数据列区域 -START-->
        <template slot="column">
          <el-table-column type="selection" width="40">
          </el-table-column>
          <el-table-column type="index" label="序号" width="40">
          </el-table-column>
          <el-table-column prop="userName" label="用户名" min-width="80">
          </el-table-column>
          <el-table-column prop="realName" label="姓名" min-width="80">
          </el-table-column>
          <el-table-column prop="roleName" label="角色" min-width="80">
          </el-table-column>
          <el-table-column prop="realName" label="所属机构" min-width="80">
          </el-table-column>
        </template>
        <!--数据列区域 -END-->
      </data-box>
    </el-col>
    <el-col class="btns">
      <el-button @click="nextStep">下一步</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-col>
  </el-col>
</template>
<script>
  import DataBox from '@/components/DataBox'
  import servers from '@/config/servers'
  import net from '@/util/net'

  export default {
    name: 'allot-include-tree',
    data() {
      return {
        server: {
          getAllDepartment: servers.SystemManage.get_all_department,
          queryDeptRoleUser: servers.CaseManage.query_dept_role_user
        },
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        params: {
          realName: '',
          roleName: ''
        },
        defaultParams: {
          deptCode: ''
        },
        nowNode: null
      }
    },
    methods: {
      /**
       * 下一步
       */
      nextStep() {
        if (this.nowNode) {
          if (this.$refs['databox'].getCurrentSelection().length > 0) {
            this.$confirm('是否将案件分配给所选催收员?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              this.$store.commit('updateCaseAllotUser', this.$refs['databox'].getCurrentSelection())
              this.$emit('user')
              this.$emit('close')
            })
          } else {
            this.$confirm('是否将案件分配给所选机构?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              this.$store.commit('updateCaseAllotOrg', this.nowNode)
              this.$emit('org')
              this.$emit('close')
            })
          }
        } else {
          this.$alert('请选择催收机构或催收员', '提示', {
            confirmButtonText: '确定'
          })
        }
      },
      /**
       * 取消
       */
      cancel() {
        this.$emit('close')
      },
      /**
       * 获取当前树选择项
       */
      getCheckedNodes(item) {
        console.log(item)
        if (item.deptCode === this.defaultParams.deptCode) {
          return false
        }
        this.defaultParams.deptCode = item.deptCode
        this.$refs['databox'].refresh()
        this.nowNode = item
      },
      /**
       * 获取组织列表转化为树可用数据
       */
      getOrgTree() {
        net.send({
          server: this.server.getAllDepartment
        }).then((data) => {
          // 递归构建组织树
          let fun = (id) => {
            // 递归对象子元素
            let list = data.filter(x => x.pid === id).map(node => {
              // 递归构建子节点
              let children = fun(node.deptId)
              // 节点添加children或leaf属性
              if (children && children.length) {
                // 设置子元素
                node.children = children
                // 添加叶子节点标识
              }
              return node
            })
            return list
          }
          // 生成数据树
          this.treeData = fun(null)
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
        this.nowNode = null
        this.defaultParams.deptCode = ''
        this.params.realName = ''
        this.params.name = ''
        this.$refs['databox'].reset()
        this.getOrgTree()
      }
    },
    mounted() {
      this.getOrgTree()
    },
    components: {
      DataBox
    }
  }

</script>
<style scoped>
  .btns {
    padding: 20px;
  }

</style>
