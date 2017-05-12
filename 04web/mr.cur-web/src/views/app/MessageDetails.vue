<template>
  <div class="message-details">
    <data-grid v-if="selectedItem" iconClass="icon" :labelWidth="100" row-key="orapId" contentAlign="left" style="line-height:24px">
      <data-grid-item label="消息类型：" :span="6" min-width="50px">{{selectedItem.type|reminderTypeConvert}}</data-grid-item>
      <data-grid-item label="日期：" :span="6" min-width="80px">{{selectedItem.createTime}}</data-grid-item>
      <data-grid-item label="消息标题：" :span="12" min-width="80px">
        <el-button @click="titleClick" type="text" size="small">{{selectedItem.title}}</el-button>
      </data-grid-item>
      <data-grid-item label="消息内容：" :span="12" min-width="80px">{{selectedItem.content}}</data-grid-item>
    </data-grid>
  </div>
</template>
<script>
  import DataGrid from '@/components/DataGrid'
  import DataGridItem from '@/components/DataGridItem'
  import server from '@/config/servers'
  import net from '@/util/net'

  export default {
    name: 'message-details',
    computed: {
      selectedItem() {
        return this.$store.state.app.message_details_item
      }
    },
    methods: {
      /**
       * 消息标题click事件
       */
      titleClick() {
        this.$store.commit('updateMessageDetailsDialog', false)
        this.$store.commit('updateMessageListDialog', false)
        this.$router.push(`/acc-center/${this.accCenterType(this.selectedItem.cupoRecType)}-case/${this.selectedItem.cupoId}/${this.selectedItem.cupoCaseNum}/${this.selectedItem.custId}`)
      },
      refresh() {
        if (this.selectedItem.state === 'UnRead') {
          console.log(1111)
          net.send({
            server: server.user.get_reminder_message,
            append: this.selectedItem.id
          }).then((data) => {}, err => {
            this.$message({
              type: 'info',
              message: err.reason
            })
          })
        }
      },
      accCenterType(val) {
        switch (val) {
          case 69:
            return 'call'
          case 70:
            return 'visit'
          default:
            return 'call'
        }
      }
    },
    components: {
      DataGrid,
      DataGridItem
    }
  }

</script>
<style scoped>
  .message-details {
    padding: 0px 5px 5px 5px;
  }

</style>
