<template>
  <div class="nav-header">
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="header-left" :class="{'preview-img':(preview)}">
      </el-col>
      <el-col :span="12" class="header-right">
        <a type="text" v-if="workState()" @click="dialog.modifyPassword = true" style="margin-right:320px;font-size:14px">修改密码</a>
        <work-bench v-if="workState()" calss="work-bench"></work-bench>
        <a v-if="!workState()" @click="back" class="back">返回</a>
      </el-col>
    </el-row>
    <!--修改密码弹出框-->
    <el-dialog title="修改密码" v-model="dialog.modifyPassword" size="tiny">
      <ModifyPassword @close="dialog.modifyPassword = false"></ModifyPassword>
    </el-dialog>
    <!--查看文件弹出框-->
    <el-dialog title="查看" v-model="check_img_dialog" size="small" style="line-height:30px" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-col>
        <img v-for="v,i in check_img_url" :key="i" :src="v" class="text-center" width="500" style="padding-bottom:20px"></img>
      </el-col>
    </el-dialog>
    <!--消息详情弹出框-->
    <el-dialog title="消息详情" @open="MessageDetailsOpen" size="small" v-model="messageDetails" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false" style="line-height:30px">
      <MessageDetails ref="MessageDetails"></MessageDetails>
    </el-dialog>
    <!--更多消息弹出框-->
    <el-dialog title="消息列表" @open="MessageListOpen" size="small" v-model="messageList" :show-close="true" :close-on-click-modal="false" :close-on-press-escape="false" style="line-height:30px">
      <MessageList ref="MessageList"></MessageList>
    </el-dialog>
  </div>
</template>
<script>
  import app from '@/config/app'
  import WorkBench from '@/components/WorkBench'
  import ModifyPassword from '@/views/app/ModifyPassword'
  import { mapMutations, mapState } from 'vuex'
  import MessageList from '@/views/app/MessageList'
  import MessageDetails from '@/views/app/MessageDetails'

  export default {
    name: 'nav-header',
    data() {
      return {
        preview: app.preview,
        name: app.name,
        version: app.version,
        dialog: {
          modifyPassword: false
        }
      }
    },
    computed: {
      ...mapState({
        type: state => state.accManage.type
      }),
      // 查看文件弹出框
      check_img_dialog: {
        get() {
          return this.$store.state.app.check_img_dialog
        },
        set(val) {
          this.$store.commit('updateCheckImgDialog', val)
        }
      },
      check_img_url: {
        get() {
          return this.$store.state.app.check_img_url
        },
        set(val) {
          this.$store.commit('updateCheckImgUrl', val)
        }
      },
      // 消息列表弹出框
      messageList: {
        get() {
          return this.$store.state.app.message_list_dialog
        },
        set(val) {
          this.$store.commit('updateMessageListDialog', val)
        }
      },
      // 消息详情弹出框
      messageDetails: {
        get() {
          return this.$store.state.app.message_details_dialog
        },
        set(val) {
          this.$store.commit('updateMessageDetailsDialog', val)
        }
      }
    },
    methods: {
      ...mapMutations([
        'saveUpdateTime'
      ]),
      workState() {
        return this.$route.name !== 'acc-center'
      },
      back() {
        this.saveUpdateTime()
        this.$router.push({ name: this.type })
      },
      // 消息列表Open
      MessageListOpen() {
        this.$nextTick(() => {
          this.$refs['MessageList'].refresh()
        })
      },
      // 消息详情Open
      MessageDetailsOpen() {
        this.$nextTick(() => {
          this.$refs['MessageDetails'].refresh()
        })
      }
    },
    components: {
      WorkBench,
      ModifyPassword,
      MessageList,
      MessageDetails
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .nav-header {
    background-color: #28313e;
    color: white;
    height: 65px;
    line-height: 65px;
  }
  
  .header-left {
    background-color: #28313e;
    text-align: left;
    padding-left: 30px;
    background-image: url('../assets/images/header-img.png');
    background-position: 30px center;
    background-repeat: no-repeat;
    background-size: auto 50px;
  }
  
  .preview-img {
    background-image: url('../assets/images/preview-logo.png')!important;
  }
  
  .header-right {
    background-color: #28313e;
    text-align: right;
  }
  
  .header-version {
    font-size: 0.5rem;
    display: inline-block;
    color: blue;
  }
  
  .work-bench {
    position: absolute;
    right: 10px;
    top: 0;
  }
  
  .forget-passowrd {
    margin-right: 300px;
  }
  
  .back {
    margin-right: 50px;
  }

</style>
