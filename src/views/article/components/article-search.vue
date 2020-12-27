<template>
  <el-form
    :inline="true"
    :model="queryInfo"
    ref="searchRef"
    class="demo-form-inline article-search"
  >
    <el-form-item label="关键字">
      <el-input
        v-model="queryInfo.keyword"
        placeholder="请输入关键字"
      ></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="queryInfo.state" placeholder="请选择">
        <el-option label="启用" :value="1"></el-option>
        <el-option label="禁用" :value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button size="small" @click="onEmpty">清空</el-button>
      <el-button type="primary" size="small" @click="$emit('search')"
        >查询</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ArticleSearch',
  components: {},
  props: {
    queryInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {
    onEmpty () {
      // this.$refs.searchRef.resetFields()
      this.queryInfo.keyword = ''
      this.queryInfo.state = null
      this.$emit('search')
    }
  },
  created () { },
  mounted () { }
}
</script>

<style lang="less" scoped>
.el-form-item {
  margin-left: 40px;
}
</style>
