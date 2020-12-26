<template>
  <div class="QuestionsRandoms">
    <!-- 卡片区域 -->
    <el-card>
      <el-form>
        <el-form-item label="关键字" class="demo-form-inline">
          <el-input placeholder="根据编号搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'QuestionsRandoms',
  props: {

  },
  components: {

  },
  created () {

  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang='less' scoped>

</style>
