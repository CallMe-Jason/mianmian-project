<template>
  <div class="list-container">
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <form-index />
      <!-- 警告 -->
      <el-alert title="数据一共7条 " type="info" show-icon :closable="false">
      </el-alert>
      <!-- /警告 -->
      <!-- 表格区域 -->
      <el-table>
        <el-table-column :data="questionList"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import FormIndex from '@/components/form'
export default {
  name: 'List',
  // 组件
  components: {
    FormIndex
  },
  props: {},
  data() {
    return {
      // 保存基础题库列表的数组
      questionList: []
    }
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  created() {
    this.getQuestion()
  },
  mounted() {},
  // 方法
  methods: {
    // 获取基础题库列表
    getQuestion() {}
  }
}
</script>
<style scoped lang="less"></style>
