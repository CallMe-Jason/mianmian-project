<template>
  <el-form
    class="article-add"
    :model="addArticleForm"
    :rules="addArticleRules"
    ref="addArticleRef"
    label-width="100px"
  >
    <el-form-item label="文章标题：" prop="title">
      <el-input
        v-model="addArticleForm.title"
        placeholder="请输入文章标签"
      ></el-input>
    </el-form-item>
    <el-form-item label="文章内容：" prop="articleBody">
      <quill-editor
        ref="myQuillEditor"
        :options="editorOption"
        v-model="addArticleForm.articleBody"
      />
    </el-form-item>
    <el-form-item label="视频地址：">
      <el-input
        v-model="addArticleForm.videoURL"
        placeholder="请输入视频地址"
      ></el-input>
    </el-form-item>
    <el-form-item class="addArticle-btn">
      <el-button @click="$emit('close')">取消</el-button>
      <el-button type="primary" @click="onAddArticle" :loading="isLoading"
        >确定</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { addArticle, getArticleId, updateArticle } from '@/api/articles'

export default {
  name: 'ArticleAdd',
  components: {},
  props: {
    titleDialog: {
      type: String,
      default: 'add'
    },
    articleId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      addArticleForm: {
        title: '',
        articleBody: '',
        videoURL: ''
      },
      addArticleRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        articleBody: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      },
      editorOption: { // 配置富文本标签的配置项
        theme: 'snow',
        placeholder: ' ',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote'],
            ['code-block', 'image', 'video']
          ]
        }
      },
      isLoading: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    onAddArticle () {
      this.$refs.addArticleRef.validate(async valid => {
        if (!valid) return false
        this.isLoading = true

        try {
          if (this.titleDialog === 'add') {
            await addArticle(this.addArticleForm)
          } else {
            await updateArticle(this.articleId, this.addArticleForm)
          }
          this.$emit('close')
          this.$message.success(this.titleDialog === 'add' ? '添加成功' : '修改成功')
        } catch (err) {
          this.$message.error(this.titleDialog === 'add' ? '添加失败！' : '修改失败！')
        }
        this.isLoading = false
      })
    },

    async loadArticleId () {
      // console.log(this.articleId)
      if (this.titleDialog === 'edit') {
        try {
          const { data } = await getArticleId(this.articleId)
          // console.log(data)
          this.addArticleForm = data
        } catch (err) {
          this.$message('获取文章详情失败！')
        }
      }
    }
  },
  created () {
    this.loadArticleId()
  },
  mounted () { }
}
</script>

<style lang="less" scoped>
.article-add {
  .addArticle-btn {
    margin-top: 60px;
    text-align: center;
    /deep/ .el-form-item__content {
      margin-left: 0px !important;
    }
  }

  /deep/ .ql-toolbar {
    padding: 0 8px;
  }

  /deep/ .ql-editor {
    height: 200px;
  }
}
</style>
