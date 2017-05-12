<template>
  <div tabindex="1" @keydown.enter="login" class="login-page top-span col middle-span">
    <div class="nav-header row" :class="{'preview-img':(preview)}">
    </div>
    <div class="row end-span middle-span login-main" style="width:100%;flex:1">
      <el-form ref="login-form" :model="loginInfo" :rules="rules" class="login-container">
        <h2>{{appName}}<span class="mini-text">{{appVersion}}</span></h2>
        <el-form-item ref="username" prop="username">
          <el-input icon="username" class="input-icon-left" type="text" v-model="loginInfo.username" auto-complete="off" placeholder="账号">
          </el-input>
        </el-form-item>
        <el-form-item ref="password" prop="password">
          <el-input icon="userpassword" class="input-icon-left" type="password" v-model="loginInfo.password" auto-complete="off" placeholder="密码">
          </el-input>
        </el-form-item>
        <el-form-item>
          <verify-code ref="verify-code"></verify-code>
        </el-form-item>
        <el-form-item class="remember">
          <el-checkbox class="remember_cb" v-model="loginInfo.remember">记住用户名和密码</el-checkbox>
        </el-form-item>
        <div class="login_btn">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </el-form>
    </div>
    <!--<div class="login-footer row">
      <span>催收管理&nbsp;&nbsp;<i>·</i>&nbsp;&nbsp;委案管理&nbsp;&nbsp;·&nbsp;&nbsp;审批管理&nbsp;&nbsp;·&nbsp;&nbsp;配置管理&nbsp;&nbsp;·&nbsp;&nbsp;系统管理&nbsp;&nbsp;·&nbsp;&nbsp;数据统计&nbsp;&nbsp;·&nbsp;&nbsp;工作台</span>
    </div>-->
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import app from '@/config/app'
  import VerifyCode from '@/components/VerifyCode'
  import storage from '@/util/storage'

  export default {
    name: 'login',
    data() {
      return {
        preview: app.preview,
        appName: app.name,
        appVersion: app.version,
        // 用户登录信息
        loginInfo: {
          username: '',
          passowrd: '',
          remember: false
        },
        // 信息校验规则
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      ...mapActions([
        'userLogin'
      ]),
      /**
       * 用户登录
       */
      login() {
        // 校验验证码
        if (!this.$refs['verify-code'].validate()) {
          this.$message.error('验证码错误')
          return
        }

        this.$refs['login-form'].validate(valid => {
          if (!valid) return
          // 进行用户登录操作
          this.userLogin(this.loginInfo).then(message => {
            if (message) {
              this.$message.error(message)
            }
          }).catch(() => {
            this.$message('用户登陆失败')
          })
        })
      },
      /**
       * 表单重置
       */
      reset() {
        this.loginInfo.username = ''
        this.loginInfo.password = ''
        this.loginInfo.remember = false
        this.$refs['verify-code'].reset()
        storage.removeItem('account')
      }
    },
    components: {
      VerifyCode
    },
    mounted() {
      let account = storage.getItem('account')
      if (account) {
        this.loginInfo.username = account.username || ''
        this.loginInfo.password = account.password || ''
        this.loginInfo.remember = (Boolean)(account.username && account.password)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../styles/variable.less';
  .login-page {
    position: absolute;
    background: #fff;
    height: 100%;
    width: 100%;
    min-width: 1080px;
  }
  
  .nav-header {
    background: #28313e;
    color: white;
    height: 65px;
    line-height: 65px;
    width: 100%;
    background-image: url('../assets/images/header-img.png');
    background-position: 30px center;
    background-repeat: no-repeat;
    background-size: auto 50px;
  }
  
  .preview-img {
    background-image: url('../assets/images/preview-logo.png')!important;
  }
  
  .login-main {
    background-image: url('../assets/images/login-bg.png');
    background-size: auto 70%;
    background-position: 15% center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
  }
  
  .login-footer {
    height: 65px;
    text-align: center;
    vertical-align: top;
    font-size: 14px;
    color: #28313E;
  }
  
  .login-container {
    color: #333;
    box-shadow: 1px 1px 10px 1px #ddd;
    border-radius: 5px;
    background-clip: padding-box;
    background-color: #fff;
    width: 300px;
    height: 400px;
    min-width: 300px;
    min-height: 300px;
    padding: 0px 100px 40px 100px;
    overflow: hidden;
    margin-right: 15%;
  }
  
  .login-container>h2 {
    display: block;
    width: 100%;
    margin: 40px auto;
  }
  
  .mini-text {
    font-size: 10px;
    color: #64b5f6;
    margin-left: 5px;
  }
  
  .remember {
    text-align: left;
    color: red;
  }
  
  .input-label {
    background: #ffffff;
    color: #000;
    width: 50px;
  }
  
  .verify-label {
    background: #ffffff;
    color: #000;
    width: 50px;
  }
  
  .remember {
    text-align: left;
    color: red;
  }
  
  .remember_cb {
    color: #333;
  }
  
  .login_btn {
    width: 100%;
    overflow: hidden;
  }
  
  .login_btn button {
    width: 135px;
    height: 40px;
    float: right;
  }
  
  .login_btn button:first-of-type {
    float: left;
  }
  
  p:before {
    content: "台词：";
  }

</style>
