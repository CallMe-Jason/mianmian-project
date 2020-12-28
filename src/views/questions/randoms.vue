<template>
  <div class="QuestionsRandoms">
    <el-breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>题库管理</el-breadcrumb-item>
      <el-breadcrumb-item>组题列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索表单 -->
      <el-form ref="searchFormRef" label-width="80px" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input placeholder="根据编号搜索" v-model="searchText"></el-input>
          </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="clear">清除</el-button>
          <el-button type="primary" size="mini" @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <!-- /搜索表单 -->
      <!-- 警告框 -->
    <el-alert
      type="info"
      show-icon
      :closable="false"
      v-if="isOk"
    >
      <div slot="title">数据一共{{counts.counts}}条</div>
    </el-alert>
    <!-- /警告框 -->
      <!--组题数据列表 -->
    <el-table :data="randomsList" stripe style="width: 100%">
        <!-- 试题编号 -->
      <el-table-column prop="number" label="编号" width="150"></el-table-column>
      <el-table-column prop="questionType" label="题型" width="100">
        <template v-slot="scope">
          <div v-if="scope.row.questionType==='1'">单选</div>
          <div v-else-if="scope.row.questionType==='2'">多选</div>
          <div v-else>简答</div>
        </template>
      </el-table-column>
      <el-table-column label="题目编号" width="150" class="topicNum">
        <template v-slot = scope>
          <span style="color:#409eff; cursor:pointer;" @click="onToticPreview(scope.row)">{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column label="录入时间" width="150">
        <template v-slot = scope>
          <div>{{scope.row.addDate | formatTime}}</div>
        </template>
      </el-table-column>
      <el-table-column label="答题时间（s）" width="150">1460</el-table-column>
      <el-table-column label="正确率（%）" width="150">88%</el-table-column>
      <el-table-column prop="creator" label="录入人" width="150"></el-table-column>
      <el-table-column label="操作" width="150">
        <template v-slot = scope>
          <el-button type="danger" icon="el-icon-delete" circle plain @click="deleteRandoms(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      :current-page="page"
      :page-sizes="[2, 4, 10, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageNum">
    </el-pagination>
    </el-card>
    <!-- /卡片区域 -->
    <!-- 题目预览对话框-->
  <el-dialog
  :visible.sync="isToticpPreviewShow"
  >
  <div slot="title" class="dialogTitle">题目预览</div>
  <!-- 预览题目组件 -->
  <topic-preview
  :ToticPrevie = "toticPrevie"
  @close = "isToticpPreviewShow = false"
  />
  </el-dialog>
  <!-- /题目预览对话框 -->
  </div>
</template>
<script>
import TopicPreview from './components/topic-preview'
import { getRandomsList, deleteItem } from '@/api/choice'
export default {
  name: 'QuestionsRandoms',
  props: {

  },
  components: {
    TopicPreview
  },
  created () {
    this.onLoadRandoms()
  },
  data () {
    return {
      // 列表数据
      randomsList: [],
      isOk: false,
      counts: {},
      // 控制题目预览弹框显示状态
      isToticpPreviewShow: false,
      // 搜索框的数据
      searchText: '',
      // 每页显示多少条数据
      pagesize: 10,
      // 总页数
      pages: 1,
      // 当前页码
      page: 1,
      // 总共多少条数据
      pageNum: 1,
      // 预览题目详情
      toticPrevie: {}
    }
  },
  methods: {
    // 列表数据
    async onLoadRandoms () {
      try {
        const { data } = await getRandomsList()
        console.log(data)
        this.counts = data
        this.randomsList = data.items
        // console.log(this.randomsList, '#')
        this.isOk = true
        this.pagesize = data.pagesize
        this.pages = data.pages
        this.page = data.page
        this.pageNum = data.counts
      } catch (err) {
        this.$message('数据获取失败')
      }
    },
    // 点击搜索按钮触发事件
    onSearch () {
      const searchResults = this.randomsList.filter(item => {
        // console.log(item.number)
        // console.log(this.searchText, '233')
        return item.number.includes(this.searchText)
      })
      // console.log(searchResults)
      // 重新刷新页面
      this.randomsList = searchResults
    },
    // 删除按钮
    async deleteRandoms (val) {
      // console.log(data)
      const confirmResult = await this.$confirm('此操作将永久删除该题组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.error('取消删除')
      }
      try {
        const { data } = await deleteItem(val.id)
        console.log(data, '123')
        this.$message.success('删除成功')
        // 更新视图
        this.onLoadRandoms()
      } catch (err) {
        this.$message('删除失败')
      }
    },
    clear () {
      // 清空表单
      this.searchText = ''
      this.onLoadRandoms()
    },
    // 点击题目弹出题目预览框
    onToticPreview (val) {
      // console.log(val, 233)
      this.toticPrevie = val
      this.isToticpPreviewShow = true
    }
  }
}
</script>

<style lang='less' scoped>
.QuestionsRandoms {
  /deep/.el-dialog {
  border-radius: 10px;
  .el-dialog__header {
    color: #fff;
    background-color: #409EFF;
  }
  .el-dialog__headerbtn {
    .el-dialog__close {
      color: #fff;
    }
  }
  .el-dialog__body {
    .radioItem {
      display: flex;
      flex-direction: column;
      .el-radio {
        padding-top: 14px;
      }
    }
    padding: 10px;
    .previeList {
      .el-col {
        padding: 10px 0;
      }
    }
  }
}
  /deep/.el-form-item__label {
    font-size: 14px;
    color: #606266;
    font-weight: 700;
  }
  .el-form {
    display: flex;
    justify-content: space-between;
    .el-button {
      width: 56px;
      height: 32px;
    }
  }
  .topicNum {
    color: #409eff;
  }
}

</style>
