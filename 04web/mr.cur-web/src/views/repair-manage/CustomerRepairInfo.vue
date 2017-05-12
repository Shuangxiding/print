<!--客户资料配置-->
<template>
  <div>
    <el-form :model="params" ref="params" label-width="100px" class="demo-ruleForm text-left">
      <el-form-item label="关系" prop="relation" :rules="[{required:true,type:'number',message:'请选择关系',trigger:'change'}]">
        <el-col :span="8">
          <el-select v-model="params.relation" :disabled="readonly">
            <el-option v-for="{id,name} of $helper.getTypeCode('0034')" :key="id" :label="name" :value="id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="姓名" prop="name" :rules="[{required:true,message:'必须输入姓名',trigger:'blur'},
                  { message: '请输入汉字或英文字母', trigger: 'blur', pattern: /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/ },
                  { min: 2, message: '请输入2位以上汉字或英文字母', trigger: 'blur' }
]">
        <el-col :span="8">
          <el-input v-model="params.name" :readonly="readonly" :minlength="2" :maxlength="25"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <template v-for="(item,index) of params.phoneList">
          <el-col :span="8">
            <el-select v-model="item.phoneStatus" :disabled="readonly" clearable>
              <el-option v-for="{id,name} in $helper.getTypeCode('0023')" :key="id" :label="name" :value="id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8" :offset="1">
            <!--<el-input v-model="item.phone" :readonly="readonly"></el-input>-->
            <el-input v-model="item.phone" :readonly="readonly"></el-input>
            <!--<div class="el-form-item__error">请输入正确的电话号</div>-->
          </el-col>
          <el-col :span="1">
            <el-button @click="addPhoneInfo" v-show="editState===-1 && index === params.phoneList.length-1" type="text" class="iconfont icon-zengjia"></el-button>
          </el-col>
          <el-col :span="1">
            <el-button @click="reducePhoneInfo" v-show="editState===-1 && index === params.phoneList.length-1" type="text" class="iconfont icon-shanchu"></el-button>
          </el-col>
        </template>
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <template v-for="(item,index) of params.addressList">
          <el-row>
            <el-col :span="8">
              <el-select v-model="item.addressType" :disabled="readonly" clearable>
                <el-option v-for="{id,name} in $helper.getTypeCode('0024')" :key="id" :label="name" :value="id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-select v-model="item.addressStatus" :disabled="readonly" clearable>
                <el-option v-for="{id,name} in $helper.getTypeCode('0025')" :key="id" :label="name" :value="id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-col :span="8" v-if="editState===0">
            <el-input v-model="item.cityName" readonly></el-input>
          </el-col>
          <el-col :span="8" v-if="editState!==0">
            <el-cascader v-model="item.cityCode" :options="options" :props="{value:'id',label:'areaName'}" clearable></el-cascader>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-input v-model="item.address" :readonly="readonly"></el-input>
          </el-col>
          <el-col :span="1">
            <el-button @click="addAddressInfo" v-show="editState===-1 && index === params.addressList.length-1" type="text" class="iconfont icon-zengjia"></el-button>
          </el-col>
          <el-col :span="1">
            <el-button @click="reduceAddressInfo" v-show="editState===-1 && index === params.addressList.length-1" type="text" class="iconfont icon-shanchu"></el-button>
          </el-col>
        </template>
      </el-form-item>
      <el-form-item label="社交账号" prop="socialNum">
        <template v-for="(item,index) of params.socialList">
          <el-col :span="8">
            <el-select v-model="item.socialType" :disabled="readonly" clearable>
              <el-option v-for="{id,name} in $helper.getTypeCode('0026')" :key="id" :label="name" :value="id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-input v-model="item.socialNum" :readonly="readonly"></el-input>
          </el-col>
          <el-col :span="1">
            <el-button @click="addSocialInfo" v-show="editState===-1 && index === params.socialList.length-1" type="text" class="iconfont icon-zengjia"></el-button>
          </el-col>
          <el-col :span="1">
            <el-button @click="reduceSocialInfo" v-show="editState===-1 && index === params.socialList.length-1" type="text" class="iconfont icon-shanchu"></el-button>
          </el-col>
        </template>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-col :span="20">
          <el-input type="textarea" :rows="3" :readonly="readonly" v-model="params.remark" placeholder="请输入内容"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <el-button v-show="editState!==0" @click="saveClick">保存</el-button>
    <el-button v-show="editState!==0" @click="close">取消</el-button>
  </div>
</template>
<script>
  import net from '@/util/net'
  import server from '@/config/servers'
  import { getCityJson, getCityName } from '@/util/common'
  import { mapGetters } from 'vuex'

  export default {
    name: 'customer-repair-info',
    props: [
      'editState',
      'data',
      'custId',
      'repairId'
    ],
    data() {
      return {
        params: {
          relation: '',
          name: '',
          // 联系电话列表
          phoneList: [],
          // 联系地址列表
          addressList: [],
          // 社交账号列表
          socialList: [],
          remark: '',
          id: ''
        },
        options: getCityJson()
      }
    },
    computed: {
      ...mapGetters([
        'userToken'
      ]),
      readonly() {
        return this.editState === 0
      }
    },
    watch: {
      editState() {
        this.setEditState()
      },
      data() {
        this.setEditState()
      }
    },
    methods: {
      /**
       * 添加电话信息项
       */
      addPhoneInfo() {
        this.params.phoneList.push({
          phoneStatus: '',
          phone: ''
        })
      },
      /**
       * 删除电话信息项
       */
      reducePhoneInfo() {
        if (this.params.phoneList.length > 1) {
          this.params.phoneList.pop({
            phoneStatus: '',
            phone: ''
          })
        }
      },
      /**
       * 添加地址信息项
       */
      addAddressInfo() {
        this.params.addressList.push({
          addressStatus: '',
          addressType: '',
          address: ''
        })
      },
      /**
       * 删除地址信息项
       */
      reduceAddressInfo() {
        if (this.params.addressList.length > 1) {
          this.params.addressList.pop({
            addressStatus: '',
            addressType: '',
            address: ''
          })
        }
      },
      /**
       * 添加社交账号信息项
       */
      addSocialInfo() {
        this.params.socialList.push({
          socialType: '',
          socialNum: ''
        })
      },
      /**
       * 删除社交账号信息项
       */
      reduceSocialInfo() {
        if (this.params.socialList.length > 1) {
          this.params.socialList.pop({
            socialType: '',
            socialNum: ''
          })
        }
      },
      /**
       * 保存按钮处理逻辑
       */
      saveClick() {
        console.log(this.editState)
        if (this.editState < 0) {
          this.addData()
        }
        if (this.editState > 0) {
          this.updateData()
        }
      },
      /**
       * 取消按钮处理逻辑
       */
      close() {
        this.$emit('close')
        this.resetData()
      },
      /**
       * 重置数据
       */
      resetData() {
        this.params = {
          relation: '',
          name: '',
          // 联系电话列表
          phoneList: [{
            phoneStatus: 83,
            phone: ''
          }],
          // 联系地址列表
          addressList: [{
            addressStatus: 93,
            addressType: '',
            address: '',
            cityCode: [],
            cityName: []
          }],
          // 社交账号列表
          socialList: [{
            socialType: '',
            socialNum: ''
          }],
          remark: '',
          id: ''
        }
        this.$refs['params'].resetFields()
      },
      /**
       * 更新修复数据
       */
      updateData() {
        let [{ phoneStatus, phone }] = this.params.phoneList
        let [{ address, addressType, addressStatus }] = this.params.addressList
        let [{ socialType, socialNum }] = this.params.socialList
        let [{ cityCode: [provinceId, cityId, countyId] }] = this.params.addressList
        net.send({
          server: server.RepairManage.update_customer_repair_info,
          data: {
            relation: this.params.relation,
            name: this.params.name,
            remark: this.params.remark,
            id: this.params.id,
            phoneStatus,
            phone,
            address,
            addressType,
            addressStatus,
            socialType,
            socialNum,
            provinceId,
            cityId,
            countyId
          },
          append: this.repairId
        }).then(() => {
          this.$emit('success')
          this.close()
        }, ex => {
          this.$message({
            type: 'error',
            message: ex.reason
          })
        })
      },
      /**
       * 添加修复信息
       */
      addData() {
        this.$refs['params'].validate((valid) => {
          if (!valid) { return false }
          for (var index = 0; index < this.params.phoneList.length; index++) {
            let element = this.params.phoneList[index]
            if (element.phoneStatus && element.phone && (!/^[0-9-()（）]{7,18}$/.test(element.phone))) {
              this.$alert('联系电话不合法请重新输入', '提示', {
                confirmButtonText: '确定'
              })
              return
            }
          }
          this.params.addressList.map(x => {
            let [provinceId, cityId, countyId] = x.cityCode
            x.provinceId = provinceId
            x.cityId = cityId
            x.countyId = countyId
          })
          console.log(this.params.addressList)
          net.send({
            server: server.RepairManage.add_customer_repair_info,
            data: Object.assign(this.params, {
              customerInformationId: this.custId,
              reapId: this.repairId
            })
          }).then(() => {
            this.$emit('success')
            this.close()
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
          }, err => {
            this.$message({
              type: 'error',
              message: err.reason
            })
          })
        })
      },
      /**
       * 加载修复信息
       */
      loadData() {
        if (this.data) {
          this.$reset(this.params)
          this.params.relation = this.data.relation
          this.params.name = this.data.name
          this.params.remark = this.data.remark
          this.params.id = this.data.id
          this.params.phoneList.push({
            phoneStatus: this.data.phoneStatus,
            phone: this.data.phone
          })

          this.params.addressList.push({
            address: this.data.address,
            addressType: this.data.addressType,
            addressStatus: this.data.addressStatus,
            cityCode: (this.data.provinceId && this.data.cityId && this.data.countyId) ? [this.data.provinceId, this.data.cityId, this.data.countyId] : [],
            cityName: (this.data.provinceId && this.data.cityId && this.data.countyId) ? getCityName([this.data.provinceId, this.data.cityId, this.data.countyId]).join('/') : ''
          })

          this.params.socialList.push({
            socialType: this.data.socialType,
            socialNum: this.data.socialNum
          })
        }
      },
      /**
       * 设置编辑状态
       */
      setEditState() {
        if (this.editState !== -1) {
          this.loadData()
        } else {
          this.resetData()
        }
      }
    },
    mounted() {
      this.loadData()
      console.log(this.data)
      this.setEditState()
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-form-item__error {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }

</style>
