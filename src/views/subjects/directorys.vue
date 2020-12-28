<template>
  <div class="subject-catalog">
    <el-breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>学科管理</el-breadcrumb-item>
      <el-breadcrumb-item>目录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span='18'>
          <el-form label-width="80px">
            <el-form-item
              label="目录名称"
              size='small'
            >
              <el-input v-model="query.directoryName"></el-input>
            </el-form-item>
            <el-form-item
              label="状态"
              size='small'
            >
              <el-select
                v-model="query.state"
                placeholder="请选择"
              >
                <el-option
                  label="启用"
                  :value="1"
                ></el-option>
                <el-option
                  label="禁用"
                  :value="0"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="btnSearch">
              <el-button
                size='small'
                @click='clearInput'
              >清除</el-button>
              <el-button
                type='primary'
                size='small'
                @click='getList'
              >
                搜索
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 新增目录 -->
        <el-col
          :span='6'
          class="btnRightAdd"
        >
          <el-button
            type='success'
            size='small'
            icon='el-icon-edit'
            @click='getsubjectList'
          >
            新增目录
          </el-button>
        </el-col>
      </el-row>
      <!-- 提示消息 -->
      <el-alert
        :title="`总共有${counts}条数据`"
        type="info"
        :closable="false"
        show-icon
      >
      </el-alert>
      <!-- table表格 -->
      <el-table
        style="width: 100%"
        :data='list'
      >
        <el-table-column
          label="序号"
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="所属学科"
          prop='subjectName'
        >
        </el-table-column>
        <el-table-column
          label="目录名称"
          prop='directoryName'
        >
        </el-table-column>
        <el-table-column
          label="创建者"
          prop='username'
        >
        </el-table-column>
        <el-table-column
          label="创建日期"
          prop='addDate'
          width="170px"
        >
          <template slot-scope="scope">
            {{scope.row.addData | formatTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="面试题数量"
          prop='totals'
        >
        </el-table-column>
        <el-table-column
          label="状态"
          prop='state'
        >
          <template slot-scope="scope">
            {{scope.row.state===1?'已启用':'已禁用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click='changeState(scope.row)'
              v-if='scope.row.state===1'
            >
              禁用
            </el-button>
            <el-button
              type="text"
              @click='changeState(scope.row)'
              v-else
            >
              启用
            </el-button>
            <el-button
              type="text"
              :disabled='scope.row.state===1'
              @click='editSubject(scope.row)'
            >修改</el-button>
            <el-button
              type="text"
              :disabled='scope.row.state===1'
              @click="deleteSubject(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[5, 10, 15]"
        :page-size="query.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
      >
      </el-pagination>
    </el-card>

    <!-- 新增目录对话框 -->
    <el-dialog
      title="新增目录"
      :visible.sync="dialogVisible"
      width="26%"
      @close='dialog__close'
    >
      <el-form
        :rules="rules"
        ref="ruleForm"
        :model="ruleForm"
      >
        <el-form-item label='所属学科'>
          <el-select
            v-model="ruleForm.subjectID"
            placeholder="请选择"
            size='small'
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label='目录名称'
          prop='directoryName'
        >
          <el-input
            placeholder="请输入目录名称"
            size='small'
            v-model="ruleForm.directoryName"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addDirectory"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改目录项对话框 -->
    <el-dialog
      title="修改目录"
      :visible.sync="editDialogVisible"
      width="26%"
      @close='dialog__close'
    >
      <el-form
        :rules="rules"
        ref="ruleForm"
        :model="option"
      >
        <el-form-item label='所属学科'>
          <el-select
            v-model="option.subjectID"
            placeholder="请选择"
            size='small'
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label='目录名称'
          prop='directoryName'
        >
          <el-input
            placeholder="请输入目录名称"
            size='small'
            v-model="option.directoryName"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="subEditSubject"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import dayjs from '@/utils/dayjs'
import { getDirectorysList, getSubjectList, addSubject, changeSubjectState, getSubjectDetails, subSubject, deleteSubjectItem } from '@/api/subject-catalog'
export default {
  name: 'SubjectCatalog',
  components: {},
  props: {},
  data () {
    return {
      query: {
        page: 1,
        pagesize: 10,
        subjectID: null,
        directoryName: null,
        state: null
      },
      list: [],
      counts: 0,
      dialogVisible: false,
      editDialogVisible: false,
      value: '',
      options: [],
      ruleForm: {
        subjectID: '',
        directoryName: ''
      },
      rules: {
        directoryName: [{ required: true, message: '请输入目录名称', trigger: 'blur' }]
      },
      option: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getList()
    this.getsubjectLists()
  },
  mounted () { },
  methods: {
    // 获取数据列表
    async getList () {
      try {
        const { data } = await getDirectorysList(this.query)
        console.log(data);
        this.list = data.items
        this.counts = data.counts
      } catch (err) {
        this.$message.error('获取数据失败！')
      }
    },
    handleSizeChange (newSize) {
      this.query.pagesize = newSize
      this.getList()
    },
    handleCurrentChange (newPage) {
      this.query.page = newPage
      this.getList()
    },
    // 新增弹框
    getsubjectList () {
      this.dialogVisible = true
    },
    // 获取下拉框内的数据
    async getsubjectLists () {
      try {
        const { data } = await getSubjectList()
        console.log(data);
        this.options = data
      } catch (err) {
        this.$message.error('获取数据失败！')
      }
    },
    // 新增目录
    async addDirectory () {
      this.dialogVisible = false
      try {
        await addSubject({
          subjectID: this.ruleForm.subjectID,
          directoryName: this.ruleForm.directoryName
        })
        this.$message.success('添加成功！')
        this.getList()
      } catch (err) {
        this.$message.error('添加数据失败！')
      }
      this.ruleForm.subjectID = '',
        this.ruleForm.directoryName = ''
    },
    // 改变目录状态
    async changeState (val) {
      try {
        if (val.state === 1) {
          val.state = 0
        } else {
          val.state = 1
        }
        await changeSubjectState({
          id: val.id,
          state: val.state
        })
        this.$message.success('操作成功！')
      } catch (err) {
        this.$message.error('操作失败！')
      }
    },
    // 清除输入框
    clearInput () {
      this.query.directoryName = ''
      this.query.state = null
      this.getList()
    },
    // 修改目录项
    async editSubject (val) {
      this.editDialogVisible = true
      // console.log(val);
      try {
        const { data } = await getSubjectDetails(val.id)
        this.option = data
        console.log(data);
      } catch (err) {
        this.$message.error('获取数据失败！')
      }
    },
    // 提交修改
    async subEditSubject (val) {
      try {
        const { data } = await subSubject(this.option.id, this.option)
        this.getList()
        this.$message.success('修改成功！')
      } catch (err) {
        this.$message.error('修改失败！')
      }
      this.editDialogVisible = false
    },
    // 弹框关闭
    dialog__close () {
      this.ruleForm.subjectID = '',
        this.ruleForm.directoryName = ''
      this.$refs['ruleForm'].resetFields()
    },
    // 删除目录
    async deleteSubject (val) {
      const confirmReuslt = await this.$confirm(
        "此操作将永久删除该目录, 是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err)
      if (confirmReuslt === "confirm") {
        try {
          const { data } = await deleteSubjectItem(val.id)
          // console.log(data);
          this.$message.success('删除成功！')
          this.getList()
        } catch (err) {
          this.$message.error('删除失败！')
        }
      }
    }
  },
}
</script>
<style lang="less" scoped>
.subject-catalog {
  .el-card {
    margin: -10px;
    .el-row {
      .el-col {
        display: flex;
        align-items: center;
        .el-form {
          display: flex;
          align-items: center;
          .el-form-item {
            float: left;
            align-items: center;
          }
          .btnSearch {
            margin-left: -70px;
          }
        }
      }
      .btnRightAdd {
        display: flex;
        justify-content: flex-end;
        padding-top: 5px;
      }
    }
  }

  .el-table {
    .el-button {
      padding-right: 27px;
      width: 12px;
    }
  }
  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  /deep/.el-dialog {
    border-radius: 10px;
    overflow: hidden;
    .el-dialog__header {
      background-color: #409eff;
      .el-dialog__title {
        color: #fff;
      }
      .el-dialog__close {
        color: #fff;
      }
    }
    .el-form {
      margin-left: 10px;
      .el-form-item {
        .el-input {
          width: 270px;
        }
        .el-form-item__label::before {
          margin-left: -10px;
        }
        .el-form-item__content {
          .el-form-item__error {
            margin-left: 70px;
          }
        }
      }
    }
    .el-dialog__footer {
      margin-top: -15px;
    }
  }
}
</style>
