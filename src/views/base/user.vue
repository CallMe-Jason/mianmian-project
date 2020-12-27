<template>
  <div class="users-container">
    <el-breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <div class="box">
        <el-row>
          <el-col :span="5">
            <el-input placeholder="搜索" v-model.trim="queryInfo.username">
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              class="search"
              @click="getUserList"
              >搜索</el-button
            >
          </el-col>
          <el-col :span="3">
            <el-button
              type="primary"
              size="small"
              class="reset"
              @click="clearInputValue"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </div>
      <!-- 新增用户按钮 -->
      <el-row>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-edit"
          class="newly"
          @click="addDialogVisible = true"
          >新增用户</el-button
        >
      </el-row>
      <!-- Alert 警告 -->
      <el-row>
        <el-alert type="info" show-icon :closable="false"
          >共 {{ userlist.length }} 条记录</el-alert
        >
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column
          label="序号"
          prop="id"
          align="center"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          prop="email"
          align="center"
        ></el-table-column>
        <el-table-column
          label="电话"
          prop="phone"
          align="center"
        ></el-table-column>
        <el-table-column
          label="用户名"
          prop="username"
          align="center"
        ></el-table-column>
        <el-table-column
          label="权限组名称"
          prop="permission_group_title"
          align="center"
        ></el-table-column>
        <el-table-column
          label="角色"
          prop="role"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              size="mini"
              @click="showEditDialog(scope.row.id)"
              >编辑</el-button
            >
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="mini"
              @click="removeUserById(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="queryInfo.pagesize"
        layout=" sizes, prev, pager, next, jumper"
        background
        :total="1"
      >
      </el-pagination>
    </el-card>
    <!-- /卡片试图区域 -->
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="创建用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-input v-model="addForm.role"></el-input>
        </el-form-item>
        <el-form-item label="权限组名称" prop="quanxian">
          <el-select v-model="addForm.permission_group_id" placeholder="请选择">
            <el-option
              v-for="item in userlist"
              :key="item.id"
              :label="item.permission_group_title"
              :value="item.permission_group_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="phone">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="Please input"
            v-model="addForm.introduction"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户的对话框 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-input v-model="editForm.role"></el-input>
        </el-form-item>
        <el-form-item label="权限组名称" prop="quanxian">
          <el-select
            v-model="editForm.permission_group_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in userlist"
              :key="item.id"
              :label="item.permission_group_title"
              :value="item.permission_group_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="phone">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="Please input"
            v-model="editForm.introduction"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserInfo,
  removeUserInfo,
  addUserInfo,
  detailUserInfo,
  dlterUserInfo
} from '@/api/user'
export default {
  name: 'UserIndex',
  props: {},
  components: {},
  data () {
    return {
      textarea: '',
      // 获取用户列表的参数对象
      queryInfo: {
        page: 1, // 当前页数
        pagesize: 10, // 当前每页显示多少条数据
        username: '' // 关键字
      },
      userlist: [], // 用户数据
      addDialogVisible: false, // 控制新增用户对话框的显示与隐藏
      // 添加用户的表单数据
      addForm: {
        avatar: '',
        username: '',
        password: '',
        email: '',
        role: '',
        permission_group_id: null,
        introduction: ''
      },
      // 查询到的用户信息对象
      editForm: {},
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '密码的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ]
      },
      // 控制修改对话框的显示与隐藏
      editDialogVisible: false
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      try {
        const { data } = await getUserInfo(this.queryInfo)
        this.userlist = data.list
      } catch (err) {
        this.$message.error('获取用户列表失败！')
      }
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
      this.addForm.permission_group_id = ''
      this.addForm.introduction = ''
    },
    // 监听编辑用户对话框的关闭事件
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        try {
          const res = await addUserInfo(this.addForm)
          // 关闭弹出层
          this.addDialogVisible = false
          this.getUserList()
        } catch (err) {
          this.$message.error('添加用户列表失败！')
        }
      })
    },
    // 展示编辑用户的对话框
    async showEditDialog (id) {
      console.log(id)
      this.editDialogVisible = true
      try {
        const { data: res } = await detailUserInfo(id)
        this.editForm = res
      } catch (err) {
        return this.$message.error('查询用户信息失败')
      }
    },
    // 根据Id删除对应的用户信息
    async removeUserById (id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 如果用户确认删除则返回字符串confirm
      // 如果用户取消了删除返回值为字符串cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const res = await removeUserInfo(id)
      if (res.status !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      this.getUserList()
    },
    // 重置搜索框
    clearInputValue () {
      this.queryInfo.username = ''
      this.getUserList()
    },
    // 修改用户信息并提交
    editUserInfo () {
      console.log(this.editForm)
      const editfor = {
        avatar: null,
        email: this.editForm.email,
        id: this.editForm.id,
        introduction: this.editForm.introduction,
        permission_group_id: this.editForm.permission_group_id,
        phone: this.editForm.phone,
        role: this.editForm.role,
        username: this.editForm.username
      }

      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的请求
        try {
          await dlterUserInfo(this.editForm.id, editfor)
          // 关闭对话框
          this.editDialogVisible = false
          // 刷新数据列表
          this.getUserList()
          // 提示修改成功
          this.$message.success('更新用户信息成功')
        } catch (err) {
          return this.$message.error('修改用户信息失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-button {
  margin-left: 10px;
}
/deep/ .el-input {
  margin-right: 10px!important;
}
.search {
  margin-top: 3px;
}
.reset {
  margin: 3px 0 0 -50px;
}
.newly {
  float: right;
}
.el-row {
  margin-bottom: 15px;
}
.el-alert {
  margin-bottom: 10px;
}

.el-table {
  margin-bottom: 15px;
}

/deep/.el-dialog__header {
  background-color: #409eff;
}

/deep/.el-dialog__title {
  color: #fff;
  line-height: 24px;
  font-size: 18px;
}

/deep/.el-dialog__close {
  color: #fff !important;
}

/deep/.el-dialog__body {
  width: 400px;
  margin: 0 auto;
}

/deep/.el-dialog__footer {
  text-align: center;
}

/deep/.el-form-item__label {
  font-weight: 700;
}

/deep/.el-table__body {
  font-size: 12px;
}
/deep/ th {
  background-color: #fafafa!important;
}
</style>
