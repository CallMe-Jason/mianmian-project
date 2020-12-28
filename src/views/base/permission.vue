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
          <el-button class="new-permission" type="success" icon="el-icon-edit" size="mini" @click="showAddDialog">新增权限</el-button>
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
           <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-view" plain circle size="mini" @click="EditItem(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" plain circle size="mini"></el-button>
           </template>
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

      <el-dialog title="提示" :visible.sync="addDialogVisible" width="30%">
        
        <!-- 表单 -->
        <el-form :model="addRuleForm" :rules="addRules" ref="addRuleFormRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="addRuleForm.name" size="mini"></el-input>
          </el-form-item>
          <el-tree :data="treeData" :props="defaultPropsT2" show-checkbox node-key="id" :default-expand-all="true" ref="treeRef"></el-tree>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="sureAdd" size="mini">确 定</el-button>
        </span>
      </el-dialog>


      <!-- 编辑部分 -->
       <el-dialog title="提示" :visible.sync="EditDialogVisible" width="30%" v-if="EditDialogVisible">
        
        <!-- 表单 -->
        <el-form :model="EditRuleForm" :rules="EditRules" ref="addRuleFormRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="EditRuleForm.name" size="mini"></el-input>
          </el-form-item>
          <el-tree :data="treeData" :props="defaultPropsT1" show-checkbox node-key="id" :default-expand-all="true" ref="treeRefTree" :default-checked-keys='keyArray1'></el-tree>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="EditDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="sureEdit" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>

  </div>
</template>

<script>

import { UserJurisdiction, getMenuList, addMenuPre, getPreList } from '@/api/user'
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
      keyArray: '',
      keyArray1: [28],
      defaultPropsT2: {
        children: 'childs',
        label: 'title'
      },
      defaultPropsT1: {
        children: 'childs',
        label: 'title'
      },
      addRuleForm: {
        name: ''
      },
      addRules: {
        name: [
          { required: true }
        ]
      },
      EditRuleForm: {
        name: ''
      },
      EditRules: {
        name: [
          { required: true }
        ]
      },
      addDialogVisible: false,
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
      },
      treeData: [],
      EditDialogVisible: false
    }
  },
  methods: {
    async EditItem (row) {
      this.EditDialogVisible = true
      console.log(row, '花洒')
      this.getMenuList()
      try {
        const { data } = await getPreList(row.id)
        // console.log(data, '聚聚')
        this.keyArray1 = data.permissions
        this.EditRuleForm.name = row.title
        console.log(this.keyArray1)
        // this.$message.success('OK')
      } catch (err) {
        this.$message('查看失败')
      }
      // this.keyArray1 = []
    },
    sureEdit () {
      this.EditDialogVisible = false
    },
    async sureAdd () {
      this.addDialogVisible = false
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      // console.log(keys, '123123')
      // const idStr = parseInt(keys)
      // console.log(idStr, '------')
      // console.log(this.addRuleForm.name, '1231312', keys)
      this.keyArray = keys
      try {
        const { data } = await addMenuPre({
          title: this.addRuleForm.name,
          permissions: keys
        })
        this.$message.success('添加成功')
        this.addRuleForm.name=''
        
      } catch (err) {
        this.$message('添加失败')
      }
      this.permissionList()
    },
    async getMenuList () {
      try {
        const { data } = await getMenuList()
        console.log(data, '菜单列表')
        this.treeData = data
      } catch (err) {
        this.$message('获取菜单列表失败')
      }
    },
    showAddDialog () {
      this.addDialogVisible = true
      this.getMenuList()
    },
    async permissionList () {
      // console.log(this.permission, 321)
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
      this.permission.pagesize = newsize
      this.permissionList()
    },

    // 监听页码值改变事件
    handleCurrentChange (neewchange) {
      this.permission.page = neewchange
      this.permissionList()
    },

    // 搜索
    permissionListSearch () {
      // console.log(this.permission, 123123123123123123)
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
/deep/ .el-dialog {
  border-radius: 10px;
  overflow: hidden;
  width: 700px!important;
}
/deep/ .el-dialog__header {
  background-color: rgb(70, 160, 250);
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__close {
    color: #fff;
  }
}
.el-tree {
  margin-left: 100px;
}
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
