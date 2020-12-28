<!-- 组件说明 -->
<template>
  <div class="menus-container">
    <el-breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-button class="add" type="success" icon="el-icon-edit" size="mini" @click="additionMenu"
          >添加菜单</el-button
        ></el-row
      >
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column label="标题">
          <template slot-scope="scope">
            <div v-if="scope.row.level === 0" class="name1">
              <i class="el-icon-folder-opened"></i>{{ scope.row.title }}
            </div>
            <div v-if="scope.row.level === 1" class="name2">
              <i class="el-icon-tickets"></i>{{ scope.row.title }}
            </div>
            <div v-if="scope.row.level === 2" class="name3">
              <i class="el-icon-reading"></i>{{ scope.row.title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="权限点"> </el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              plain
              circle
              size="mini"
              @click="edit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              plain
              circle
              size="mini"
              @click="del(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改弹窗 -->
      <el-dialog title="菜单" :visible.sync="dialogVisible" width="50%">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
          <el-form-item label="权限组名称:" prop="PermissioName">
            <el-radio-group v-model="level" v-model.number="ruleForm.PermissioName">
              <el-radio :disabled="menuDisabled" :label="0">菜单</el-radio>
              <el-radio :disabled="menuDisabled" :label="1">权限点</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 下拉框 -->
          <el-form-item label="权限组名称:" prop="PermissioNames">
            <el-select v-model="value" placeholder="请选择" v-model.number="ruleForm.PermissioNames">
              <el-option
                :disabled="ruleForm.level === 3 && list.level !== 2"
                v-for="item in list"
                :key="item.code"
                :label="item.title"
                :value="item.id"
              >
                <span class="name2" v-if="item.level === 1">{{ item.title }}</span>
                <span class="name3" v-else-if="item.level === 2">{{ item.title }}</span>
                <span v-else>{{ item.title }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限组代码:" prop="PermissioCode">
            <el-input v-model="inputCode" placeholder="请输入内容" v-model.number="ruleForm.PermissioCode"></el-input>
          </el-form-item>
          <el-form-item label="权限组标题:" prop="PermissioTitle">
            <el-input v-model="inputHeadline" placeholder="请输入内容" v-model.number="ruleForm.PermissioTitle"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="menuDialogCancel">取 消</el-button>
          <el-button type="primary" @click="menuDialogConfirm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getmenulists } from '@/api/user.js'
export default {
  name: 'menus',
  data () {
    return {
      level: '',
      inputCode: '',
      inputHeadline: '',
      value: '',

      ruleForm: {
        PermissioCode: ''
      },
      rules: [],
      dialogVisible: false,
      fromdata: [],
      list: [],
      menuDisabled: true
    }
  },

  mounted () {},
  created () {
    this.getlist()
  },
  computed: {
    tableData () {
      return this.list
    }
  },

  methods: {
    async del (row) {
       const confirmResult = await this.$confirm(
        '此操作将永久删除该题目, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      console.log(confirmResult)
      // 如果用户点击确认,则confirmResult打印结果为confirm
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除') // 当confirmResult不等于字符串confirm时,提示用户取消
      // 点击确定，发送删除请求
    },
    async getlist () {
      const { data } = await getmenulists()
      this.list = this.transform(data, 0)
    },
    transform (a, b) {
      const arr3 = []
      function untreeData (data, i) {
        data.forEach((val) => {
          arr3.push({
            id: val.id,
            pid: val.pid,
            code: val.code,
            title: val.title,
            level: i
          })
          if (val.childs) {
            untreeData(val.childs, i + 1)
          }
          if (val.points) {
            untreeData(val.points, i + 1)
          }
        })
      }
      untreeData(a, b)
      return arr3
    },
    edit (row) {
      this.dialogVisible = true
      this.ruleForm = row
      if (this.ruleForm.level === 0 || this.ruleForm.level === 1) {
        this.level = 0
      } else {
        this.level = 1
      }
    },

    // 添加菜单
    additionMenu () {
      this.dialogVisible = true
      this.menuDisabled = false
    },

    // 点击 dialog 取消
    menuDialogCancel (formName) {
      this.dialogVisible = false
      console.log(123)
    },

    // 点击 dialog 确定
    menuDialogConfirm (formName) {
      this.dialogVisible = false
      console.log(formName)
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.menus-container {
  /deep/.el-dialog__body {
    display: flex;
    justify-content: center;
  }
  i {
    font-size: 20px;
    margin-right: 10px;
  }
  .add {
    float: right;
  }
  /deep/.is-center .cell {
    display: flex;
    justify-content: center;
  }
  /deep/.el-dialog__header {
    background-color: #409eff;
    span,
    i {
      color: #fff;
      font-size: 14px;
      // line-height: 54px;
    }
  }
}
.name1 {
  margin-left: 0;
}
.name2 {
  margin-left: 20px;
}
.name3 {
  margin-left: 40px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
