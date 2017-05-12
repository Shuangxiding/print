<template>
  <div class="data-box">
    <el-row>
      <el-col :span="24" class="db-header" v-if="!hiddenForm">
        <!--自定义表单-->
        <!--<solt name="form"></solt>-->
        <el-form :inline="true" ref="data-form" :rules="rules" :model="params" :show-message="true" :row-key="rowKey">
          <!--输入区域-START-->
          <slot name="input"></slot>
          <!--输入区域-END-->
          <!--按钮区域-START-->
          <el-button @click="handleQuery" :style="getButtonStyle()">搜索</el-button>
          <slot name="button"></slot>
          <!--按钮区域-END-->
        </el-form>
      </el-col>
      <!--数据区-START-->
      <el-col :span="24" class="db-table">
        <el-table @sort-change="handleSortChange" :default-sort="defaultSort" class="data-table" ref="data-table" @selection-change="handleSelectionChange" header-align="center" :max-height="maxHeight" :data="tableData" border stripe>
          <slot name="column"></slot>
        </el-table>
      </el-col>
      <!--数据区-END-->
      <el-col :span="24" v-if="pagination" v-show="showPagination" class="row between-span middle-span db-footer">
        <div class="info">当前显示{{currentStart}}到{{currentEnd}}条 共{{total}}条</div>
        <!--分页区-->
        <el-pagination :page-sizes="pageSizes" :page-size="pageSize" :layout="size?'prev, pager, next':'sizes, prev, pager, next'" :total="total" :current-page="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import net from '@/util/net'

  export default {
    name: 'data-box',
    componentName: 'data-box',
    props: {
      data: Array,
      server: Object, // 请求服务接口
      params: Object, // 请求参数
      rules: Object, // 表单数据校验规则
      autoSearch: Boolean, // 是否开启自动搜索
      defaultServer: Object, // 默认搜索服务地址
      defaultParams: Object, // 默认搜索参数
      defaultSort: Object, // 默认排序字段
      defaultSelection: Array, // 默认选择项
      // 数据主键
      rowKey: {
        type: String,
        require: true
      },
      // 是否隐藏表单
      hiddenForm: {
        type: Boolean,
        default: false
      },
      // 是否设置最大高度
      maxHeight: {
        type: Number,
        default: 680
      },
      // 追加数据项
      append: {
        type: [String, Array]
      },
      // 是否分页
      pagination: {
        type: Boolean,
        default: true
      },
      buttonWidth: Number,
      size: Number
    },
    data() {
      return {
        tableData: [],
        pageSizes: [10, 20, 30, 40, 100, 200],
        total: 0,
        pageSize: this.size || 10,
        currentPage: 1,
        multipleSelection: [],
        currentSort: this.defaultSort
      }
    },
    computed: {
      showPagination() {
        return this.total > 0
      },
      currentStart() {
        return ((this.currentPage - 1) * this.pageSize) + 1
      },
      currentEnd() {
        let end = this.currentStart + this.pageSize - 1
        return Math.min(end, this.total)
      }
    },
    methods: {
      getButtonStyle() {
        if (this.buttonWidth) {
          return {
            width: this.buttonWidth + 'px'
          }
        } else {
          return {}
        }
      },
      /**
       * 处理每页数据数量变化
       */
      handleSizeChange(val) {
        this.pageSize = val
        this.handleQuery()
      },
      /**
       * 处理当前页码变化
       * 后台页码从0开始
       */
      handleCurrentChange(val) {
        this.currentPage = val
        this.handleQuery()
      },
      /**
       * 处理当前选择项变化
       */
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      /**
       * 设置默认选择项
       */
      setDefaultSelection() {
        if (this.defaultSelection && this.defaultSelection.length) {
          this.$nextTick(() => {
            for (let item of this.defaultSelection) {
              this.$refs['data-table'].toggleRowSelection(this.tableData.find(d => d[this.rowKey] === item))
            }
          })
        }
      },
      /**
       * 进行数据校验
       */
      validate(callback) {
        try {
          let fromItems = this.$refs['data-form'].$children.filter(x => x.$options.componentName === 'ElFormItem')

          let valid = true
          let count = 0

          if (fromItems.length === 0) {
            callback(valid)
            return
          }

          for (let item of fromItems) {
            item.validate('', error => {
              if (error) {
                valid = false
              }
              if (typeof callback === 'function' && ++count === fromItems.length) {
                callback(valid)
              }
            })
          }
        } catch (ex) {
          callback(true)
        }
      },
      /**
       * 处理数据请求
       */
      handleQuery({ defaultServer } = {}) {
        // 获取传递参数
        let params = Object.assign({}, this.defaultParams || {}, this.params || {})
        // 获取分页设置
        let pageConfig = this.pagination ? {
          size: this.pageSize,
          page: this.currentPage - 1 // 后台页码从0开始
        } : {}

        this.validate(valid => {
          // 数据校验
          if (!valid) {
            return
          }

          net.send({
            server: defaultServer || this.server,
            data: {
              ...params,
              ...pageConfig
            },
            append: this.append
          }).then(({ content, totalElements }) => {
            // 更新数据信息
            this.tableData = content || []
            // 更新分页信息
            this.total = totalElements
            // 设置默认选择项
            this.setDefaultSelection()
          }, err => {
            console.log(err)
          })
        }, () => {
          console.log('error')
        })
      },
      /**
       * 重置搜索框
       */
      formResetFields() {
        this.$refs['data-form'].resetFields()
      },
      /**
       * 刷新数据
       */
      refresh() {
        this.currentPage = 1
        this.handleQuery()
      },
      /**
       * 处理排序变化
       */
      handleSortChange({ prop, order }) {
        // TODO:待确认
      },
      /**
       * 获取当前选择项
       * 对外数据公开
       */
      getCurrentSelection() {
        return this.multipleSelection
      },
      /**
       * 进行数据校验
       */
      // validate() {
      //   this.$refs['data-form'].validate((valid) => {
      //     if (valid) {
      //       return Promise.resolve()
      //     } else {
      //       return Promise.reject(new Error('验证失败'))
      //     }
      //   })
      // },
      reset() {
        this.$reset()
      }
    },
    watch: {
      data(value) {
        // 根据外部数据更新
        this.tableData = value || []
      },
      defaultParams() {
        this.handleQuery()
      }
    },
    mounted() {
      if (this.autoSearch === true) {
        Promise.resolve().then(() => {
          this.handleQuery(this.defaultServer)
        }).catch(ex => {
          console.log(ex)
        })
      }

      if (this.data) {
        this.tableData = this.data
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../styles/variable.less';
  @margin: 5px;
  .data-box {
    margin: @margin
  }
  
  .data-box .data-table th {
    text-align: center;
  }
  
  .db-header {
    text-align: left;
    margin: @margin 0;
  }
  
  .db-footer {
    text-align: right;
    margin: @margin 0;
    .info {
      color: @-font-color-light;
    }
  }
  
  .input-area,
  .button-area * {
    display: inline-block;
    & * {
      margin: 30px 0;
    }
  }

</style>
