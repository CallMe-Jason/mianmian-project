<template>
  <div class="from-container">
    <div class="btn_wrapper">
      <span style="font-size: 12px; color: pink;">
        说明：目前支持学科和关键字条件筛选
      </span>
      <el-button type="success" size="small" icon="el-icon-edit"
        >新增试题</el-button
      >
    </div>
    <!-- 表单区域 -->
    <el-form>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="学科">
            <el-select
              size="small"
              placeholder="请选择"
              v-model="newProcess.processid"
              value-key="id"
            >
              <el-option value="1" label="23"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="二级目录">
            <el-select
              size="small"
              placeholder="请选择"
              v-model="newProcess.processid"
              value-key="id"
            >
              <el-option value="1" label="23"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="标签">
            <el-select
              size="small"
              placeholder="请选择"
              v-model="newProcess.processid"
              value-key="id"
            >
              <el-option value="1" label="23"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="关键字">
            <el-select
              size="small"
              placeholder="请选择"
              v-model="newProcess.processid"
              value-key="id"
            >
              <el-option value="1" label="23"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="试题类型">
            <el-select
              size="small"
              placeholder="请选择"
              v-model="newProcess.processid"
              value-key="id"
            >
              <el-option value="1" label="23"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="难度">
            <el-select
              size="small"
              placeholder="请选择"
              v-model="newProcess.processid"
              value-key="id"
            >
              <el-option value="1" label="23"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="方向">
            <el-select
              size="small"
              placeholder="请选择"
              v-model="newProcess.processid"
              value-key="id"
            >
              <el-option value="1" label="23"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="录入人">
            <el-select
              size="small"
              placeholder="请选择"
              v-model="newProcess.processid"
              value-key="id"
            >
              <el-option value="1" label="23"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="题目备注">
            <el-select
              size="small"
              placeholder="请选择"
              v-model="newProcess.processid"
              value-key="id"
            >
              <el-option value="1" label="23"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业简称">
            <el-select
              size="small"
              placeholder="请选择"
              v-model="newProcess.processid"
              value-key="id"
            >
              <el-option value="1" label="23"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="城市" class="city">
            <el-select
              class="left"
              size="small"
              plac
              v-model="newProcess.processid"
              value-key="id"
              eholder="请选择"
            >
              <el-option value="1" label="23"></el-option>
            </el-select>
            <el-select
              class="right"
              size="small"
              pl
              v-model="newProcess.processid"
              value-key="id"
              aceholder="请选择"
            >
              <el-option value="1" label="23"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="last">
            <el-button size="small">清除</el-button>
            <el-button type="primary" size="small">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- /表单区域 -->
  </div>
</template>
<script>
export default {
  name: 'FormIndex',
  // 组件
  components: {},
  props: {},
  data() {
    return {
      newProcess: ''
    }
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  created() {},
  mounted() {},
  // 方法
  methods: {}
}
</script>
<style scoped lang="less">
.btn_wrapper {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
.el-row {
  margin: 0 !important;
}
.el-col {
  padding: 0 !important;
}
/deep/.el-form-item {
  margin-bottom: 18px;
  // display: flex;
  // margin-left: 80px;
  .el-form-item__label {
    width: 80px;
  }
  .el-form-item__content {
    margin-left: 80px;
  }
}
.el-select {
  width: 100%;
}
.left {
  width: 48%;
  margin-right: 2%;
}
.right {
  width: 50%;
}
.last {
  text-align: right;
}
</style>
