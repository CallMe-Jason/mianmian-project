<template>
  <div class="articles-list">
    <el-breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>面试技巧</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索区域 -->
      <el-row>
        <el-col :span="18">
          <article-search :queryInfo="queryInfo" @search="loadArticles" />
        </el-col>

        <el-col class="add-btn" :span="6">
          <el-button
            icon="el-icon-edit"
            type="success"
            size="small"
            @click="addArticlesDialog = true"
            >新增技巧</el-button
          >
        </el-col>
      </el-row>

      <!-- 提示区域 -->
      <alert :total="total" />

      <!-- 表格区域 -->
      <el-table :data="articlesList">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="title" label="文章标题" width="400">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
            <span
              :class="scope.row.videoURL ? 'el-icon-film' : ''"
              @click="onPlay(scope.row.videoURL)"
            ></span>
          </template>
        </el-table-column>
        <el-table-column prop="visits" label="阅读数"> </el-table-column>
        <el-table-column prop="username" label="录入人"> </el-table-column>
        <el-table-column prop="createTime" label="录入时间">
          <template slot-scope="scope">
            {{ scope.row.createTime | formatTime }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="100">
          <template slot-scope="scope">
            {{ scope.row.state === 1 ? "已启用" : "已禁用" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="onPreview(scope.row)"
              >预览</el-button
            >
            <el-button type="text" @click="onArticleState(scope.row)">{{
              scope.row.state === 1 ? "禁用" : "启用"
            }}</el-button>
            <el-button
              type="text"
              :disabled="scope.row.state === 1"
              @click="onUpdateArticle(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              :disabled="scope.row.state === 1"
              @click="onRemoveArticle(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <pageination
        :pagesizes="pagesizes"
        :queryInfo="queryInfo"
        :total="total"
        @change="loadArticles()"
      />
    </el-card>

    <!-- 预览弹出层区域 -->
    <el-dialog title="预览文章" :visible.sync="PreviewDialog" width="50%">
      <article-preview v-if="PreviewDialog" :item="previewItem" />
    </el-dialog>

    <!-- 新增技巧弹出层区域 -->
    <el-dialog
      title="新增文章"
      :visible.sync="addArticlesDialog"
      width="45%"
      @close="onClose"
    >
      <article-add
        v-if="addArticlesDialog"
        @close="addArticlesDialog = false"
      />
    </el-dialog>

    <!-- 修改弹出层区域 -->
    <el-dialog
      title="修改文章"
      :visible.sync="updateArticlesDialog"
      width="45%"
      @close="onClose"
    >
      <article-add
        titleDialog="edit"
        v-if="updateArticlesDialog"
        :articleId="articleId"
        @close="updateArticlesDialog = false"
      />
    </el-dialog>

    <!-- 视频弹出层区域 -->
    <el-dialog class="video-dialog" :visible.sync="VideoDialog" width="50%">
      <article-video v-if="VideoDialog" :video="video" />
    </el-dialog>
  </div>
</template>

<script>
import { getArticles, updateArticleState, deleteArticle } from '@/api/articles'
import ArticlePreview from './components/article-preview'
import ArticleAdd from './components/article-add'
import ArticleSearch from './components/article-search'
import ArticleVideo from './components/article-video'
import Alert from '@/components/alert'
import Pageination from '@/components/pagination'

export default {
  name: 'ArticlesList',
  components: {
    Alert,
    Pageination,
    ArticlePreview,
    ArticleAdd,
    ArticleSearch,
    ArticleVideo
  },
  props: {},
  data () {
    return {
      queryInfo: {
        page: 1,
        pagesize: 10,
        keyword: '',
        state: null
      },
      articlesList: [],
      total: 0,
      PreviewDialog: false, // 控制预览对话框的显示与隐藏
      previewItem: {}, // 可以预览文章的数据
      addArticlesDialog: false, // 控制添加技巧对话框的显示与隐藏
      updateArticlesDialog: false, // 控制修改文章对话框的显示与隐藏
      articleId: null, // 文章Id
      VideoDialog: false, // 控制视频对话框的显示与隐藏
      video: null,
      pagesizes: [5, 10, 20, 50]
    }
  },
  watch: {},
  computed: {},
  methods: {
    async loadArticles () {
      try {
        const { data } = await getArticles(this.queryInfo)
        // console.log(data)
        this.articlesList = data.items
        this.total = data.counts
      } catch (err) {
        this.$message('获取数据失败！')
      }
    },

    onPreview (row) {
      this.previewItem = row
      this.PreviewDialog = true
    },

    onClose () {
      this.loadArticles()
    },

    onUpdateArticle (row) {
      // console.log(row)
      this.articleId = row.id
      this.updateArticlesDialog = true
    },

    async onArticleState (row) {
      // console.log(row.state)
      try {
        // 假设已禁用，就启用
        let state = 1
        if (row.state === 1) {
          // 已启用，就禁用
          state = 0
        }
        row.state = state
        await updateArticleState(row.id, row.state)
        this.$message.success('操作成功')
      } catch (err) {
        this.$message.error('操作失败')
      }
    },

    async onRemoveArticle (id) {
      try {
        await this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteArticle(id)
        this.loadArticles()
        this.$message.success('删除成功！')
      } catch (err) {
        if (err === 'cancel') return this.$message.info('取消删除')
        this.$message.error('删除失败！')
      }
    },

    onPlay (videoURL) {
      // console.log(videoURL)
      this.video = videoURL
      this.VideoDialog = true
    }
  },
  created () {
    this.loadArticles()
  },
  mounted () { }
}
</script>

<style lang="less" scoped>
.articles-list {
  .el-icon-film {
    color: #00f;
    font-size: 18px;
    cursor: pointer;
  }
  .add-btn {
    padding-top: 6px;
    text-align: right;
  }
  .el-alert {
    margin-bottom: 10px;
  }

  /deep/ .el-table th.is-leaf {
    border-bottom: 2px solid #e8e8e8;
    background-color: #fafafa;
  }

  .el-pagination {
    margin-top: 15px;
    text-align: right;
  }

  /deep/ .video-dialog {
    .el-dialog__header {
      padding: 0;
      .el-dialog__headerbtn {
        top: -70px;
        right: 50%;
        transform: translateX(50%);
        width: 50px;
        height: 50px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
        color: #fff;
        font-size: 20px;
      }
    }
    .el-dialog__body {
      padding: 0;
    }
  }
}
</style>
