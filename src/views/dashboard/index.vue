<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="top">
            <span>总答题数量</span>
            <i class="el-icon-warning"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="top">
            <span>试题方向</span>
            <i class="el-icon-warning"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="top">
            <span>试题学科分布</span>
            <i class="el-icon-warning"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="top">
            <span>上周试题新增</span>
            <i class="el-icon-warning"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div class="flex">前端与java学科试题走势图</div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="前端学科" name="first">前端学科</el-tab-pane>
            <el-tab-pane label="JAVA学科" name="second">JAVA学科</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  props: {

  },
  components: {

  },
  created () {

  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick () {
    }
  }
}
</script>

<style lang='less' scoped>
.dashboard {
  .el-row {
    padding: 9px 0;
    .el-col {
      .el-card {
        .flex {
          position: absolute;
          top: 30px;
          right: 20px;
          color: rgb(153, 153, 153);
        }
        .top {
          display: flex;
          justify-content: space-between;
          span {
            color: #97a8be;
            font-size: 14px;
          }
          i {
            color: rgb(152, 169, 189);
          }
        }
      }
    }
  }
}
</style>
