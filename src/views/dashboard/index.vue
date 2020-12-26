<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="top">
            <span>总答题数量</span>
            <i class="el-icon-warning"></i>
          </div>
          <div class="text">
            <div class="number">
              260,560
            </div>
            <div class="bottom">
              <span>
                周同比 12%
                <i class="el-icon-caret-top"></i>
              </span>
              <span>
                日环比 11%
                <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <hr>
          <span>日答题数量</span>
          <span>12,423</span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="top">
            <span>试题方向</span>
            <i class="el-icon-warning"></i>
          </div>
          <radar />
          <hr>
          <span>试题库数量</span>
          <span>10,234</span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="top">
            <span>试题学科分布</span>
            <i class="el-icon-warning"></i>
          </div>
          <pie />
          <hr>
          <span>前端试题数量</span>
          <span>5,234</span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="top">
            <span>上周试题新增</span>
            <i class="el-icon-warning"></i>
          </div>
          <bar />
          <hr>
          <span>上周新增总量</span>
          <span>1,234</span>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div class="flex">前端与java学科试题走势图</div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="前端学科" name="first">
              <line-1 />
            </el-tab-pane>
            <el-tab-pane label="JAVA学科" name="second">
              <line-2 />
            </el-tab-pane>
          </el-tabs>
          <list class="list" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import List from './components/list.vue'
import Bar from './components/bar.vue'
import Line1 from './components/line1.vue'
import Line2 from './components/line2.vue'
import Pie from './components/pie.vue'
import Radar from './components/radar.vue'
export default {
  name: 'dashboard',
  props: {

  },
  components: {
    Radar,
    Pie,
    Bar,
    Line1,
    Line2,
    List
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
        span {
          font-size: 14px;
          padding-left: 30px;
        }
        .flex {
          position: absolute;
          top: 30px;
          right: 20px;
          color: rgb(153, 153, 153);
        }
        .top {
          display: flex;
          justify-content: space-between;
          // flex-direction: column;
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
.text {
  width: 219px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .bottom {
    display: flex;
    justify-content: space-between;
    span {
      display: block;
      width: 100px;
      margin-left: 10px;
      font-size: 14px;
    }
  }
  // align-items: center;
  .number {
    line-height: 140px;
    height: 140px;
    font-size: 32px;
  }
}
.el-icon-caret-top {
  color: red;
}
.el-icon-caret-bottom {
  color: green;
}
.list {
  width: 300px;
  // height: 300px;
  position: absolute;
  right: 70px;
  bottom: 50px;
}
</style>
