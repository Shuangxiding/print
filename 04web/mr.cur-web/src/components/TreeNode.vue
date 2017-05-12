<template>
  <li draggable="true" @dragstart.stop="handleDragStart($event)" @dragenter="handleDragEnter" @dragleave="handleDragLeave" @dragover.prevent="handleDragOver" @drop.stop="handleDrop($event)" @dragend.prevent="handleDragEnd" id="tree-node">
    <span @mouseenter="showOprators" @mouseleave="hideOprators">
      <span class="el-tree-node__expand-icon"></span>
    <a @click="">{{node.name}}</a>
    <small v-if="show_oprators" class="icon-box">
        <a @click="editNode" href="#" class="el-icon-edit"></a>
        <a @click="addNode" href="#" class="el-icon-plus"></a>
        <a @click="removeNode" href="#" class="el-icon-minus"></a>
      </small>
    </span>
    <ul v-show="node.children.length" class="node-ul">
      <tree-node v-for="(node,index) in node.children" :key="index" :node.sync="node"></tree-node>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'tree-node',
    data() {
      return {
        show_oprators: false,
        is_draged: false
      }
    },
    props: ['node'],
    methods: {
      handleDrop(e) {
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
        vm.$parent.node.children = vm.$parent.node.children.filter(node => node !== currentNode)
        this.node.children.push(currentNode)
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
      handleDragEnter() { if (!this.is_draged) this.$el.style.backgroundColor = '' },
      handleDragLeave() { if (!this.is_draged) this.$el.style.backgroundColor = '' },
      handleDragOver() {},

      showOprators() { this.show_oprators = true },
      hideOprators() { this.show_oprators = false },

      addNode() {
        const name = prompt('Input the name of new node', 'new node')
        if (!!name && !!name.trim()) {
          this.node.children.push({ name: name.trim(), children: [] })
        }
      },
      removeNode() {
        if (confirm(`Do you want to remove node: ${this.node.name}`)) {
          const currentNode = this.node
          this.$parent.node.children = this.$parent.node.children.filter(node => node !== currentNode)
        }
      },
      editNode() {
        const name = prompt('Input the name of new node', this.node.name)
        if (!!name && !!name.trim()) {
          this.node.name = name.trim()
        }
      }
    }
  }

</script>
<style scoped>
  ul,
  li {
    list-style: none;
    padding: 0;
  }
  
  .node-ul {
    padding-left: 10px;
  }
  
  .icon-box a {
    text-decoration: none;
    color: #999;
    font-size: 14px;
    letter-spacing: 0.5em;
  }
  
  #tree-node {
    text-align: left;
  }

</style>
