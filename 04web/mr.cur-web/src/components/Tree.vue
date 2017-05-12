<template>
  <ul><tree-node :node.sync="node"></tree-node></ul>
</template>
<script>
  import TreeNode from '@/components/TreeNode'

  export default{
    name: 'tree',
    props: ['node'],
    components: {
      TreeNode
    }
  }
</script>
<style scoped>
  ul{
    padding:0;
  }
</style>
