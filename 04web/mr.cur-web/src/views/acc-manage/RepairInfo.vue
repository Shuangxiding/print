<!--客户资料配置-->
<template>
  <div>
    <el-form :model="params" ref="params" label-width="100px" class="demo-ruleForm">
      <el-form-item label="关系" prop="relation">
        <el-col :span="12">
          <el-select v-model="params.relation" style="float:left">
            <el-option label="请选择" value="1"></el-option>
            <el-option label="本人" value="0"></el-option>
            <el-option label="父母" value="1"></el-option>
            <el-option label="子女" value="0"></el-option>
            <el-option label="亲属" value="1"></el-option>
            <el-option label="同事" value="0"></el-option>
            <el-option label="朋友" value="1"></el-option>
            <el-option label="其他" value="1"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-col :span="8">
          <el-select v-model="params.name" style="float:left">
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input v-model="params.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-col :span="8">
          <el-select v-model="params.phone" style="float:left">
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0023')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-input v-model="params.phone" style="float:left"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-row style="margin-bottom:20px">
          <el-col :span="8">
            <el-select v-model="params.address" style="float:left">
              <el-option v-for="{id,name} in this.$helper.getTypeCode('0024')" :key="id" :label="name" :value="id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select v-model="params.address" style="float:left">
              <el-option v-for="{id,name} in this.$helper.getTypeCode('0025')" :key="id" :label="name" :value="id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-cascader style="float:left" :options="options" :props="{value:'id',label:'areaName'}"></el-cascader>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-cascader style="float:left" :options="options" :props="{value:'id',label:'areaName'}"></el-cascader>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-cascader style="float:left" :options="options" :props="{value:'id',label:'areaName'}"></el-cascader>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-input v-model="params.socialNum"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="社交账号" prop="socialNum">
        <el-col :span="8">
          <el-select v-model="params.socialNum" style="float:left">
            <el-option v-for="{id,name} in this.$helper.getTypeCode('0025')" :key="id" :label="name" :value="id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-input v-model="params.socialNum"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-col :span="23">
          <el-input type="textarea" v-model="params.remark"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <!--<el-button type="primary" @click="saveClick">保存</el-button>
        <el-button @click="cancelClick">取消</el-button>-->
        <el-button v-if="isModify" @click="saveClick">保存</el-button>
        <el-button v-else @click="saveUpClick">保存</el-button>
        <el-button v-if="isModify" @click="cancelClick">取消</el-button>
        <el-button v-else @click="cancelUpClick">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { getCityJson } from '@/util/common'
  import { mapGetters } from 'vuex'

  export default {
    name: 'repair-info',
    props: [
      'isModify'
    ],
    data() {
      return {
        params: {
          relation: '',
          name: '',
          phone: '',
          address: '',
          socialNum: '',
          remark: ''
        },
        options: getCityJson(),
        multipleSelection: []
      }
    },
    computed: {
      addrepair: {
        get() {
          return this.$store.state.repairManage.addrepair
        },
        set(val) {
          this.$store.commit('addrepair', val)
        }
      },
      edit: {
        get() {
          return this.$store.state.repairManage.edit
        },
        set(val) {
          this.$store.commit('edit', val)
        }
      },
      ...mapGetters([
        'userToken'
      ])
    },
    methods: {
      saveClick() {

      },
      saveUpClick() {

      },
      cancelClick() {
        this.addrepair = false
      },
      cancelUpClick() {
        this.edit = false
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
