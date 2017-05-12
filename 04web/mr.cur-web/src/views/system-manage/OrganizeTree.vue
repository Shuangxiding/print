<template>
  <div>
    <origanize-node v-for="item of dataTree" :key="item.deptId" :node.sync="item"></origanize-node>
  </div>
</template>

<script>
  import net from '@/util/net'
  import server from '@/config/servers'
  import OriganizeNode from '@/views/system-manage/OriganizeNode'

  export default {
    name: 'origanize-tree',
    componentName: 'origanize-tree',
    data() {
      return {
        dataList: [], // 数据列表
        dataTree: [], // 数据树
        selected: '' // 当前选择项
      }
    },
    methods: {
      /**
       * 获取组织列表
       */
      getList() {
        net.send({
          server: server.SystemManage.get_all_department
        }).then(data => {
          this.dataList = data
          this.createTree(data)
        })
      },
      /**
       * 创建数据树
       */
      createTree(data) {
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
              node.isLeaf = false
              // 添加默认展开标识
              node.expand = true
            } else {
              // 添加叶子节点标识
              node.isLeaf = true
            }
            return node
          })

          return list
        }

        // 生成数据树
        this.dataTree = fun(null)
        this.updateDefaultSelected()
      },
      /**
       * 更新默认选中节点
       */
      updateDefaultSelected() {
        if (this.dataTree && this.dataTree.length) {
          this.updateSelected(this.dataTree[0])
        }
      },
      /**
       * 更新当前选择项
       */
      updateSelected(value) {
        if (this.selected !== value) {
          this.selected = value
          // 发送change事件
          this.$emit('change', value)
        }
      },
      // TODO:暂时性解决办法
      forceRefresh() {
        let temp = this.dataTree
        this.dataTree = []
        this.$nextTick(() => {
          this.dataTree = temp
        })
      },
      refresh() {
        this.getList()
      }
    },
    components: {
      OriganizeNode
    },
    /**
     * 组件挂载逻辑
     */
    mounted() {
      this.getList()
    }
  }

</script>
<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>


</style>
