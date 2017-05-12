<template>
  <div class="work-bench">
    <!--用户信息区域-->
    <div style="background:white;color:black;height:66px;font-size:14px;">
      <div class="head-portrait"></div>
      <span style="float:left">欢迎您, {{userInfo.realName}}</span>
      <a @click="userLogout" class="iconfont icon-tuichu" style="font-weight:bold;font-size:1.5rem;color:red;position:absolute;right:14px;"></a>
    </div>

    <!--展开控制按钮区域-->
    <div class="tip text-left" @click="handleClick">
      <i style="font-size:1.5rem;line-height:43px;" class="iconfont icon-wodegongzuotai v-bottom"></i>
      <span>我的工作台</span>
      <el-badge :value="unReadeMessage?unReadeMessage:'0'" class="work-bench-sup" :max="99" :class="{ 'buzz':unReadeMessage}">
        <span class="v-bottom iconfont icon-xiaoxitixing" style="font-size:1.5rem;line-height:43px;color:#fff;"></span>
      </el-badge>
      <a :class="{arrowDown:is_expend,arrowUp:!is_expend}" class="iconfont icon-xiala" style="position:absolute;right:1rem;"></a>
    </div>

    <!--主要数据显示区域-->
    <div :class="{open:is_expend,close:!is_expend}" class="info-content box">
      <!-- 任务一览表区域 -->
      <div>
        <el-row>
          <el-col class="header">任务一览表</el-col>
        </el-row>
        <el-row>
          <el-col class="sum-item" :span="12">
            <div class="title">当前催收总案件</div>
            <div>
              {{platform.currentCaseSum}}个
            </div>
          </el-col>
          <el-col class="sum-item" :span="12">
            <div class="title">今日流入案件</div>
            <div>
              {{platform.flowInCaseToday}}个
            </div>
          </el-col>
          <el-col class="sum-item" :span="12">
            <div class="title">今日结清案件</div>
            <div>
              {{platform.finishCaseToday}}个
            </div>
          </el-col>
          <el-col class="sum-item" :span="12">
            <div class="title">今日流出案件</div>
            <div>
              {{platform.flowOutCaseToday}}个
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 数据统计区域 -->
      <div>
        <el-row>
          <el-col class="header">数据统计</el-col>
        </el-row>
        <el-row class="sum-content" style="padding:12px;">
          <el-col class="row between-span middle-span acc-num" style="background-color:#eceff4;">
            <div class="v-bottom">催收案件总数</div>
            <div style="vertical-align:bottom">
              <span class="large-num v-bottom">{{platform.caseSum}}</span>
              <span class="v-bottom">个</span>
            </div>
          </el-col>
          <el-col class="row between-span middle-span repay-num" style="background-color:#0092dc">
            <div class="v-bottom">回款总额</div>
            <div class="v-bottom" style="color:#ffeb3b;">
              <span class="large-num v-bottom">{{platform.moneySumResult}}</span>
              <span class="v-bottom">元</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="sum-item" :span="12">
            <div class="title">本月累计回款</div>
            <div>
              {{platform.monthMoneyResult}}元
            </div>
          </el-col>
          <el-col class="sum-item" :span="12">
            <div class="title">今日累计回款</div>
            <div>
              {{platform.dayMoneyResult}}元
            </div>
          </el-col>
          <el-col class="sum-item" :span="12">
            <div class="title">本月累计催收</div>
            <div>
              {{platform.monthFollowCount}}次
            </div>
          </el-col>
          <el-col class="sum-item" :span="12">
            <div class="title">今日累计催收</div>
            <div>
              {{platform.dayFollowCount}}次
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 消息提醒区域 -->
      <div>
        <el-row>
          <el-col class="header">消息提醒</el-col>
          <a @click="$store.commit('updateMessageListDialog', true)" style="position:absolute;right:20px;top:0px;font-size:8px!important;line-height:30px;">更多</a s>
        </el-row>
        <el-row>
          <el-col v-for="item of messageList" :key="item.id" class="reminderItem" style="height:75px;position:relative;cursor:pointer;">
            <div class="text-left" @click="$store.commit('updateMessageDetailsDialog', true),$store.commit('updateMessageDetailsItem', item)">
              <div :style="getReminderStyle(item.state)" style="float:left">【{{item.type|reminderTypeConvert}}】</div>
              <div>{{item.title}}</div>
            </div>
            <div class="text-right" style="position:absolute;bottom:0;right:0">{{item.createTime}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import net from '@/util/net'
  import server from '@/config/servers'
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    name: 'work-bench',
    data() {
      return {
        is_expend: false,
        selectId: null,
        dialog: {
          messageList: false
        },
        unReadeMessage: 0,
        messageList: []
      }
    },
    computed: {
      ...mapState({
        platform: 'platform_data'
      }),
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      ...mapActions([
        'userLogout'
      ]),
      ...mapMutations([
        'addMessageListener'
      ]),
      handleClick() {
        this.is_expend = !this.is_expend
      },
      getReminderStyle(type) {
        let reminderTypeStyle = {
          'UnRead': {
            color: '#ff5722'
          },
          'Read': {
            color: '#0092dc'
          }
        }
        return reminderTypeStyle[type]
      }
    },
    mounted() {
      // net.send({
      //   server: server.user.get_remindmessage_workbench
      // }).then((data) => {
      //   this.unReadeMessage = data.unReadeCount
      //   this.messageList = data.messageList.content.slice(0, 3)
      // }, err => {
      //   this.$message({
      //     type: 'info',
      //     message: err.reason
      //   })
      // })
      // this.addMessageListener({
      //   type: 'Reminder',
      //   callback: (() => {
      //     let self = this
      //     return () => {
      //       net.send({
      //         server: server.user.get_remindmessage_workbench
      //       }).then((data) => {
      //         self.unReadeMessage = data.unReadeCount
      //         self.messageList = data.messageList.content.slice(0, 3)
      //       }, err => {
      //         self.$message({
      //           type: 'info',
      //           message: err.reason
      //         })
      //       })
      //     }
      //   })()
      // })
      this.addMessageListener({
        type: 'ReminderList',
        callback: (() => {
          let self = this
          return () => {
            net.send({
              server: server.user.get_remindmessage_workbench
            }).then((data) => {
              self.unReadeMessage = data.unReadeCount
              self.messageList = data.messageList.content.slice(0, 3)
            }, err => {
              self.$message({
                type: 'info',
                message: err.reason
              })
            })
          }
        })()
      })
    }
  }

</script>
<!-- Add "scoped " attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../styles/variable.less';
  .work-bench {
    width: 280px;
    min-height: 100px;
    text-align: center;
    z-index: 999;
    box-shadow: 2px 2px 10px @-shadow-color;
  }
  
  .info-content {
    text-align: center;
    color: black;
    font-size: 12px;
    background: white;
  }
  
  .tip {
    background-color: #4a5a71;
    height: 43px;
    line-height: 43px;
    color: #64b5f6;
    padding: 0 1rem;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  
  .close {
    max-height: 0;
    min-height: 0;
    overflow: hidden;
  }
  
  .open {
    max-height: auto;
    overflow: hidden;
  }
  
  .arrowDown {
    transform: rotate(180deg);
    transition: transform ease-in 0.2s;
  }
  
  .arrowUp {
    transform: rotate(360deg);
    transition: transform ease-in 0.2s;
  }
  
  .header {
    height: 30px;
    line-height: 30px;
    background: #e3f2fd;
    color: #64b5f6;
    font-weight: bold;
    font-size: 14px;
  }
  
  .sum-content {
    &>* {
      border-radius: 8px;
      font-size: 0.9rem;
      line-height: 1.5rem;
      padding: 10px;
      font-weight: bold;
    }
    & .acc-num {
      /*TODO:待替换为正确颜色*/
      background: lightgray;
      color: #0092dc;
      margin-bottom: 12px;
    }
    & .repay-num {
      background: deepskyblue;
      color: white;
    }
    .large-num {
      font-size: 1.5rem;
    }
  }
  
  .sum-item {
    border-top: solid 1px lightgrey;
    height: 54px;
    line-height: 27px;
    &:nth-child(1),
    &:nth-child(3) {
      border-right: solid 1px lightgrey;
    }
    &:nth-child(3),
    &:nth-child(4) {
      border-bottom: solid 1px lightgrey;
    }
  }
  
  .title {
    font-size: 0.8rem;
    color: #8c8c8c;
  }
  
  .head-portrait {
    height: 45px;
    width: 45px;
    margin-left: 14px;
    margin-right: 10px;
    background-image: url('../assets/images/head-portrait.png');
    background-repeat: no-repeat;
    float: left;
    margin-top: 10px;
    border-radius: 50%;
  }
  
  .v-bottom {
    vertical-align: bottom;
  }
  
  .reminderItem {
    padding: 5px 12px;
    * {
      padding: 0 5px;
      line-height: 25px;
    }
    border-bottom: solid 1px lightgrey;
  }
  
  .message-number {
    color: #ffebcb;
  }
  
  @keyframes buzz-out {
    2% {
      transform: translate(1.5px, -2.5px) rotate(-0.5deg);
    }
    4% {
      transform: translate(1.5px, 2.5px) rotate(1.5deg);
    }
    6% {
      transform: translate(2.5px, 2.5px) rotate(1.5deg);
    }
    8% {
      transform: translate(3.5px, 2.5px) rotate(0.5deg);
    }
    10% {
      transform: translate(0.5px, 2.5px) rotate(0.5deg);
    }
    12% {
      transform: translate(1.5px, 1.5px) rotate(0.5deg);
    }
    14% {
      transform: translate(0.5px, 0.5px) rotate(0.5deg);
    }
    16% {
      transform: translate(-1.5px, -0.5px) rotate(1.5deg);
    }
    18% {
      transform: translate(0.5px, 0.5px) rotate(1.5deg);
    }
    20% {
      transform: translate(2.5px, 2.5px) rotate(1.5deg);
    }
    22% {
      transform: translate(0.5px, -1.5px) rotate(1.5deg);
    }
    24% {
      transform: translate(-1.5px, 1.5px) rotate(-0.5deg);
    }
    26% {
      transform: translate(1.5px, 0.5px) rotate(1.5deg);
    }
    28% {
      transform: translate(-0.5px, -0.5px) rotate(-0.5deg);
    }
    30% {
      transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    }
    32% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }
    34% {
      transform: translate(2.5px, 2.5px) rotate(-0.5deg);
    }
    36% {
      transform: translate(0.5px, -1.5px) rotate(0.5deg);
    }
    38% {
      transform: translate(2.5px, -0.5px) rotate(-0.5deg);
    }
    40% {
      transform: translate(-0.5px, 2.5px) rotate(0.5deg);
    }
    42% {
      transform: translate(-1.5px, 2.5px) rotate(0.5deg);
    }
    44% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }
    46% {
      transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    }
    48% {
      transform: translate(2.5px, -0.5px) rotate(0.5deg);
    }
    50% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }
    52% {
      transform: translate(-0.5px, 1.5px) rotate(0.5deg);
    }
    54% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }
    56% {
      transform: translate(0.5px, 2.5px) rotate(1.5deg);
    }
    58% {
      transform: translate(2.5px, 2.5px) rotate(0.5deg);
    }
    0%,
    60%,
    100% {
      transform: translate(0, 0) rotate(0);
    }
  }
  
  .buzz {
    animation-delay: 0s;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-name: buzz-out;
    animation-timing-function: ease-in-out;
  }

</style>
