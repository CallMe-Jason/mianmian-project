<template>
  <div class="BasePermission">
    <el-card>
      <el-row>
        <el-col :span="4" class="BasePermission-col">
          <el-input size="mini" placeholder="请输入内容" v-model="permission.keyword" class="input-with-select">
          </el-input>
        </el-col>
        <el-col :span="4" class="search-col-btn">
          <el-button size="mini" @click="permissionEliminate">清除</el-button>
          <el-button type="primary" size="mini" @click="permissionListSearch">搜索</el-button>
        </el-col>
        <el-col :span="4" class="new-menu">
          <el-button class="new-permission" type="success" icon="el-icon-edit" size="mini" @click="dialogeEnterprise = true">新增权限</el-button>
        </el-col>
      </el-row>
    <!-- 数据记录 -->
      <div class="alert">
        <el-alert
          type="info"
          :closable="false"
          show-icon
        >
        <template>
          <div slot="title">
            数据一共{{userInfo.counts}}条
          </div>
        </template>
        </el-alert>
      </div>
      <!-- end -->

      <el-table
        :data="userdata"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          class="is_center"
          label="用户名"
          width="450%"
          prop="title">
        </el-table-column>
        <el-table-column
          prop="update_date"
          label="日期"
          width="450%">
        </el-table-column>
        <!-- <template slot-scope="scope"> -->
          <!-- <div>{{scope.row.update_date | formatTime}}</div> -->
          <!-- <div>{{scope.row}}</div> -->
       <!-- </template> -->
        <el-table-column
          prop="address"
          label="操作"
          show-overflow-tooltip>
            <el-button type="primary" icon="el-icon-edit" plain circle size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" plain circle size="mini"></el-button>
        </el-table-column>
      </el-table>

      <!-- 分页模块 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="permission.page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="permission.pagesize"
        layout=" prev, pager, next, sizes, jumper"
        :total="total"
        >
      </el-pagination>

      <!-- 新增权限弹框 -->
      <Dialog v-model="dialogeEnterprise"></Dialog>
      <!-- <el-dialog
        title="提示"
        :visible.sync="dialogeEnterprise"
        width="60%"
        :before-close="handleClose">
        <span>这是一段信息</span>
          <Dialog></Dialog>
        <span slot="footer" class="dialog-footer">

          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog> -->

      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
  <el-form-item
    label="年龄"
    prop="age"
    :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
  >
    <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
    <el-button @click="resetForm('numberValidateForm')">重置</el-button>
  </el-form-item>
</el-form>

    </el-card>

  </div>
</template>

<script>

import { UserJurisdiction } from '@/api/user'
import Dialog from './components/dialog'
// import dayjs from 'dayjs'

export default {
  name: 'BasePermission',
  props: {
  },
  components: {
    Dialog
  },
  created () {
    this.permissionList()
  },
  data () {
    return {
      dialogeEnterprise: false,
      permission: {
        page: 1,
        pagesize: 3,
        keyword: ''
      },
      userdata: [],
      userInfo: {},
      // userItem: {},
      total: 1,

      numberValidateForm: {
        age: ''
      }
    }
  },
  methods: {
    async permissionList () {
      console.log(this.permission, 321)
      try {
        const { data } = await UserJurisdiction(this.permission)
        console.log(data, 233)
        this.userInfo = data
        this.userdata = data.list
        this.total = this.userInfo.counts
        // this.userItem = this.userdata.forEach(item => {
        //   this.userItem = item
        //   // console.log(this.updateTime)
        // })
        // console.log(this.updateTime, 2222)
      } catch (err) {
        console.log(err)
      }
      // console.log(this.userdata[0].update_date)

      // console.log(this.userdata[0], '0000')
    },

    // 监听 page-sizes 事件
    handleSizeChange (newsize) {
      this.permission.page = newsize
      this.permissionList()
    },

    // 监听页码值改变事件
    handleCurrentChange (neewchange) {
      this.permission.pagesize = neewchange
      this.permissionList()
    },

    // 搜索
    permissionListSearch () {
      console.log(this.permission, 123123123123123123)
      this.permissionList()
    },

    // 清除
    permissionEliminate () {
      this.permission.keyword = ''
    },

    resetForm (formName) {
      console.log(formName)
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang='less' scoped>

.BasePermission{
  .alert {
  margin: 20px 0;
}
  position: relative;
  .new-permission{
    position: absolute;
    right: 20px;
  }
  .BasePermission-col{

    /deep/.input-with-select{
      height: 28px;
    }

  }

  .search-col-btn{
    margin-left: 20px;
    font-size: 12px;
  }

  /deep/.el-table th > .cell {
    text-align: center;
  }

  /deep/.el-table .cell {
    text-align: center;
  }

  /deep/.permission-dialog {
    .el-dialog {
      border-radius: 10px;
    }
    .el-dialog__header {
      border-radius: 10px 10px 0 0;
      background-color: #409eff;
      .el-icon-close {
        color: #fff;
      }
    }
  }

}

</style>
