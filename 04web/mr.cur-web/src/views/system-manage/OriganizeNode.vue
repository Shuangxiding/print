<template>
  <div style="text-align:left;padding:1px">

    <div draggable="true" @dragstart.stop="handleDragStart($event)" @dragenter="handleDragEnter" @dragleave="handleDragLeave" @dragover.prevent="handleDragOver" @drop.stop="handleDrop($event)" @dragend.prevent="handleDragEnd" id="tree-node" :style="getSubTreeStyle()">
      <div>
        <span @click="expanedItemHandle" v-show="!node.isLeaf" class="el-tree-node__expand-icon" :class="{expanded:expanded}"></span>
        <a @click="selectItemHandle">{{node.name}}</a>
        <small v-show="selected" class="icon-box">
            <a @click="editItemHandle" href="#" class="el-icon-edit" v-role="0x090106"></a>
            <a @click="addItemHandle" href="#" class="el-icon-plus" v-role="0x090106"></a>
            <a @click="removeItemHandle" href="#" class="el-icon-minus" v-role="0x090106"></a>
         </small>
      </div>
      <div v-show="expanded" class="sub-node">
        <origanize-node v-for="(item,index) in node.children" :key="item.deptId" :node.sync="item"></origanize-node>
      </div>
    </div>
  </div>
</template>

<script>
  // TODO:抽象为公共组件
  export default {
    name: 'origanize-node',
    componentName: 'origanize-node',
    data() {
      return {
        expanded: this.node.expand && !this.node.isLeaf, // 当前节点展开状态
        root: {}, // 根节点对象
        show_oprators: false,
        is_draged: false
      }
    },
    props: {
      node: Object // 当前节点对象
    },
    computed: {
      /**
       * 当前节点是否被选中
       */
      selected() {
        return this.root.selected === this.node
      }
    },
    methods: {
      getSubTreeStyle() {
        return {
          marginLeft: this.node.isLeaf === true ? '2em' : '1em',
          marginTop: '3px'
        }
      },
      /**
       * 节点展开处理
       */
      expanedItemHandle() {
        this.expanded = !this.expanded // 更新展开状态
      },
      /**
       * 节点选择处理
       */
      selectItemHandle() {
        this.root.updateSelected(this.node) // 更新选择元素
      },
      /**
       * 获取当前父元素
       */
      parent(flag) {
        var parent = this.$parent
        // 向上寻找根节点元素
        while (parent && parent.$options && parent.$options.componentName !== 'origanize-tree') {
          parent = parent.$parent
        }
        return parent
      },
      /**
       * 修改节点处理
       */
      editItemHandle() {
        this.root.$emit('edit', this.node)
      },
      /**
       * 添加节点处理
       */
      addItemHandle() {
        this.root.$emit('add', this.node)
      },
      /**
       * 删除节点处理
       */
      removeItemHandle() {
        this.root.$emit('remove', this.node)
      },
      /**
       * 拖动逻辑处理
       */
      handleDrop(e) {
        // 获取原始节点
        const vm = window.__drop_node__

        this.$el.style.backgroundColor = ''
        vm.$el.style.backgroundColor = ''

        let __parent__ = this
        while (__parent__ !== undefined) {
          if (__parent__ === vm) {
            return
          }
          __parent__ = __parent__.$parent
        }

        const currentNode = vm.node

        // 目标节点与原节点相同直接退出
        // if (vm.$parent.node.depId === this.node.depId) {
        //   return
        // }
        // 从原节点子元素中删除对象
        vm.$parent.node.children = vm.$parent.node.children.filter(node => node !== currentNode)
        // 添加到目标对象子元素中
        if (!this.node.children) {
          this.node.children = []
        }
        this.node.children.push(currentNode)
        this.node.isLeaf = false
        this.node.expand = true
        // 更新新的父ID
        currentNode.pid = this.node.id
        // 父节点强制刷新
        this.parent().forceRefresh()
        this.parent().$emit('drag', currentNode, vm.$parent.node, this.node)
      },
      handleDragEnd() {
        this.$el.style.backgroundColor = ''
      },
      handleDragStart(e) {
        this.show = false
        this.is_draged = true
        window.__drop_node__ = this
        this.$el.style.backgroundColor = 'grey'
      },
      handleDragEnter() {
        if (!this.is_draged) {
          this.$el.style.backgroundColor = ''
        }
      },
      handleDragLeave() {
        if (!this.is_draged) {
          this.$el.style.backgroundColor = ''
        }
      },
      handleDragOver() {},
      showOprators() {
        this.show_oprators = true
      },
      hideOprators() {
        this.show_oprators = false
      }
    },
    /**
     * 挂载处理逻辑
     */
    mounted() {
      // 获取根节点
      this.root = this.parent()
    }
  }

</script>
<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>


</style>
