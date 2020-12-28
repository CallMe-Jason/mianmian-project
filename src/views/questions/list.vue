<template>
  <div class="QuestionsList">
    <el-breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>题库管理</el-breadcrumb-item>
      <el-breadcrumb-item>基础题库</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <form-index @query-qusetion="queryQusetion" />
      <!-- 警告 -->
      <el-alert type="info" show-icon :closable="false">
        <template slot="title">数据一共{{ counts }}条</template>
      </el-alert>
      <!-- /警告 -->
      <!-- 表格区域 -->
      <el-table :data="qusetionList">
        <el-table-column prop="number" label="试题编号" width="126px">
        </el-table-column>
        <el-table-column prop="subject" label="学科"> </el-table-column>
        <el-table-column prop="catalog" label="目录"> </el-table-column>
        <el-table-column prop="subject" label="题型"> </el-table-column>
        <el-table-column label="题干" width="280px">
          <template v-slot="scope">
            <div v-html="scope.row.question"></div>
          </template>
        </el-table-column>
        <el-table-column label="录入时间" width="180px">
          <template v-slot="scope">
            {{ scope.row.addDate | filterTime }}
          </template>
        </el-table-column>
        <el-table-column prop="subject" label="难度"> </el-table-column>
        <el-table-column prop="creator" label="录入人"> </el-table-column>
        <el-table-column prop="subject" label="操作" width="200px">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-view"
              size="small"
              circle
              plain
              @click="Preview(scope.row)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-edit"
              size="small"
              circle
              plain
              @click="editQusetion(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              circle
              plain
              @click="removeById(scope.row.id)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-check"
              size="small"
              circle
              plain
              @click="addQuestionId(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 预览弹出框 -->

    <el-dialog
      title="题目预览"
      :visible.sync="previewDialogVisible"
      width="70%"
    >
      <qusetion-index :basiclist="basiclist" v-if="previewDialogVisible" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="previewDialogVisible = false">
          关闭</el-button
        >
      </span>
    </el-dialog>
    <!-- /预览弹出框 -->
  </div>
</template>

<script>
import FormIndex from '@/components/form'
import QusetionIndex from '@/components/qusetion'
import {
  getQusetionList,
  deleteQusetion,
  addChoice,
  getBasicQusetion
} from '@/api/qusetion'
export default {
  name: 'QuestionsList',
  props: {},
  components: {
    FormIndex,
    QusetionIndex
  },
  created() {
    // 在这里可以获取到数据
    this.getQusetion()
  },
  data() {
    return {
      // 查询参数对象
      queryInfo: {
        page: 1, // 当前页数
        pagesize: 10, // 页尺寸
        keyword: '' // 关键字
      },
      // 总条数
      counts: 0,
      // 保存基础数据的数组、
      qusetionList: [],
      addQuestionVisible: false,
      // 表示加入还是移除
      choiceState: 1,
      // 控制预览弹出框的显示与隐藏
      previewDialogVisible: false,
      basiclist: {}
    }
  },
  methods: {
    async getQusetion(query) {
      try {
        const { data } = await getQusetionList(this.queryInfo)
        console.log(data, 1)
        this.counts = data.counts
        this.qusetionList = data.items
      } catch (err) {
        this.$message.error('获取数据失败！请稍后重试')
      }
    },
    // 点击删除按钮时
    async removeById(id) {
      // 弹出提示框，是否删除用户,可以使用.catch捕获所有的错误,并且返回
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
      try {
        const { data } = await deleteQusetion(id)
        console.log(data)
        this.$message.success('删除成功')
      } catch (err) {
        this.$message.error('删除失败')
      }
      this.getQusetion()
    },
    // 点击对勾时
    async addQuestionId(id) {
      // 弹出提示框，是否删除用户,可以使用.catch捕获所有的错误,并且返回
      const confirmResult = await this.$confirm(
        '此操作将该题目加入精选, 是否继续?',
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
      // 点击确定，发送添加请求
      try {
        const { data } = await addChoice(id, this.choiceState)
        console.log(data)
      } catch (err) {
        this.$message.error('添加失败')
      }
      this.getQusetion()
    },
    // 点击预览
    async Preview(val) {
      console.log(val)
      try {
        const { data } = await getBasicQusetion(val.id)
        console.log(data)
        this.basiclist = data
        // console.log(typeof this.basiclist)
      } catch (err) {
        this.$message.error('获取数据失败，请稍后重试！')
      }
      // 显示弹出框
      this.previewDialogVisible = true
    },
    async queryQusetion(val) {
      console.log(val)
      this.queryInfo = val
      console.log(this.queryInfo)
      this.getQusetion(this.queryInfo)
    },
    editQusetion(val) {
      this.$router.push({
        path: '/questions/new',
        query: {
          id: val.id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-dialog {
  border-radius: 10px;
  .el-dialog__header {
    background: #409eff;
    border-radius: 9px 9px 0 0;
    .el-dialog__title {
      color: #fff;
    }
  }
  .el-col {
    padding: 10px 0;
  }
  .video {
    width: 400px;
    height: 300px;
    .videoURL {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
