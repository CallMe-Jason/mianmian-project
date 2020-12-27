<template>
  <div class="article-preview">
    <h2 class="preview-title">{{ item.title }}</h2>
    <div class="preview-text">
      <span>{{ item.createTime | dataformat }}</span>
      <span>{{ item.username }}</span>
      <span class="el-icon-view"></span>
      <span>{{ item.visits }}</span>
    </div>

    <!-- 富文本编辑器组件 -->
    <quill-editor
      ref="myQuillEditor"
      :options="editorOption"
      v-model="item.articleBody"
      @ready="onEditorReady"
    />
  </div>
</template>

<script>
export default {
  name: 'ArticlePreview',
  components: {},
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      editorOption: { // 配置富文本标签的配置项
        theme: 'bubble'
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    onEditorReady (e) { // // 富文本准备时的事件
      // console.log(e)
      e.enable(false) // 禁用编辑
    }
  },
  created () { },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.article-preview {
  .preview-title {
    margin: 0;
  }
  .preview-text {
    span {
      margin-left: 10px;
      margin-top: 10px;
    }
  }

  /deep/ .ql-container {
    margin-top: 10px;
    background-color: #f5f5f5;
    border-top: 1px dashed #ccc;
    .ql-editor {
      p {
        margin: 10px 0;
      }
    }
  }
}
</style>
