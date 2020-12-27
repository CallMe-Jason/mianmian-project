<template>
  <div class="QuestionsChoice">
    <el-breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>题库管理</el-breadcrumb-item>
      <el-breadcrumb-item>精选题库</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索表单组件 -->
      <choice-search @query-qusetion="onSearchChoice"  @againGetList='againGetList'/>
      <!-- tab 栏切换 -->
     <div class="list">
        <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="全部" name="first">
           <choice-all :choiceList = "listOne" @againGetList='againGetList'/>
        </el-tab-pane>
        <el-tab-pane label="待审核" name="second">
          <choice-all :choiceList = "listDai" v-if="isok" />
        </el-tab-pane>
        <el-tab-pane label="已审核" name="third">
          <choice-all :choiceList = "listTong" v-if="isok" />
        </el-tab-pane>
        <el-tab-pane label="已拒绝" name="fourth">
          <choice-all :choiceList = "listJu" v-if="isok" />
        </el-tab-pane>
      </el-tabs>
      <!-- /tab 栏切换 -->
      <!-- 分页区域 -->
      <el-pagination
        :current-page="page"
        :page-sizes="[2, 4, 10, 15]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts">
      </el-pagination>
     </div>
    <!-- /分页区域 -->
    </el-card>
    <!-- /卡片区域 -->
  </div>
</template>
<script>
import { getChoiceList } from '@/api/choice'
import choiceAll from './components/choice-all'
import ChoiceSearch from './components/choice-search.vue'
export default {
  name: 'QuestionsChoice',
  props: {

  },
  components: {
    choiceAll,
    ChoiceSearch
  },
  created () {
    this.onLoadChoice()
  },
  data () {
    return {
      listDai: [],
      listTong: [],
      listJu: [],
      isok: false,
      listOne: [],
      activeName: 'first',
      // // 精选题列表
      // choiceList: {},
      // 每页显示多少条数据
      pagesize: 10,
      // 总页数
      pages: 1,
      // 当前页码
      page: 1,
      // 总共多少条数据
      counts: 1
    }
  },
  methods: {
    againGetList () {
      this.onLoadChoice()
    },
    // 获取精选题库
    async onLoadChoice () {
      try {
        const { data } = await getChoiceList()
        console.log(data, '999')
        this.choiceList = data
        this.listOne = this.choiceList.items
        this.listDai = this.listOne.filter((item, index) => {
          return item.chkState === 0
        })
        this.listTong = this.listOne.filter((item, index) => {
          return item.chkState === 1
        })
        this.listJu = this.listOne.filter((item, index) => {
          return item.chkState === 2
        })
        this.isok = true
        this.pagesize = data.pagesize
        this.pages = data.pages
        this.page = data.page
        this.counts = data.counts
      } catch (err) {
        // this.$message('获取失败')
      }
    },
    async onSearchChoice (data) {
      console.log(data, 233)
      // console.log(data.pagesize)
      // 更新视图
      try {
        const { data: results } = await getChoiceList({
          subjectID: data.subjectID,
          page: data.page,
          pagesize: 10,
          chkState: data.chkState
        })
        console.log(results, '888')
        this.choiceList = results
        this.listOne = this.choiceList.items
        this.listDai = this.listOne.filter((item, index) => {
          return item.chkState === 0
        })
        this.listTong = this.listOne.filter((item, index) => {
          return item.chkState === 1
        })
        this.listJu = this.listOne.filter((item, index) => {
          return item.chkState === 2
        })
      } catch (err) {
        this.$message('获取失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.list {
  margin-top: 200px;
}
.QuestionsChoice {
  /deep/.el-card {
    background-color: #fff;
  }
}
</style>
