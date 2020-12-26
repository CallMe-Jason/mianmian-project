<template>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
        <el-button size="mini" @click="close">清除</el-button>
        <el-button size="mini" type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
import { getSubjectsList } from '@/api/subjects'

export default {
  name: 'Search',
  props: {

  },
  created () {

  },
  data () {
    return {
      form: {
        name: ''
      },
      page: 1,
      pagesize: 10
    }
  },
  methods: {
    // 清空列表项
    close () {
      this.form.name = ''
    },
    // 点击搜索发送请求
    async search () {
      // console.log(this.form.name)
      try {
        const { data } = await getSubjectsList({
          page: this.page,
          pagesize: this.pagesize,
          subjectName: this.form.name
        })
        // console.log(data, '123')
        this.$emit('search', data)
      } catch (err) {
        this.$message('搜索失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.el-input {
  width: 177px;
  padding-right: 10px;
  /deep/ .el-input__inner {
    height: 28px;
  }
}
</style>
