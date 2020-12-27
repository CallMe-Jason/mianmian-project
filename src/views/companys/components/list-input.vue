<template>
  <el-row class="list-input" :gutter="20">
    <el-col :span="5">
      <span class="text">标签名称：</span
      ><el-input placeholder="请输入标签名称" v-model.trim="queryInfo.tags">
      </el-input>
    </el-col>
    <el-col :span="4">
      <span>省：</span>
      <el-select
        v-model.trim="queryInfo.province"
        placeholder="请选择"
        @change="onChange"
      >
        <el-option
          v-for="item in cityList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <span>市：</span>
      <el-select v-model.trim="queryInfo.city" placeholder="请选择">
        <el-option
          v-for="item in area"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="5">
      <span class="text">企业名称：</span
      ><el-input
        placeholder="请输入标签名称"
        v-model.trim="queryInfo.shortName"
      >
      </el-input>
    </el-col>
    <el-col :span="3">
      <span style="width: 76px">状态：</span
      ><el-select v-model.trim="queryInfo.state" placeholder="请选择">
        <el-option
          v-for="(item, index) in operation"
          :key="index"
          :label="item"
          :value="index"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="3">
      <span>操作：</span>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="onSearch"
        >搜索</el-button
      >
    </el-col>
  </el-row>
</template>

<script>
import citydata from '../citydata'
export default {
  name: 'ListInput',
  components: {},
  props: {},
  data () {
    return {
      queryInfo: {
        tags: null, // 标签名称
        province: null, // 省
        city: null, // 市
        state: null, // 操作
        shortName: null // 企业名称
      },
      cityList: citydata, // 城市的数据
      area: [], // 市的数据
      operation: ['禁用', '启用'] // 操作的数据
    }
  },
  watch: {},
  computed: {},
  methods: {
    onChange (value) {
      // console.log(value)
      const item = this.cityList.find(item => item.label === value)
      // console.log(item)
      this.area = item.children
      this.queryInfo.city = item.children[0].label
    },

    onSearch () {
      // console.log(this.operatValue)
      // console.log(this.queryInfo)
      this.$emit('search', this.queryInfo)
    }
  },
  created () { },
  mounted () { }
}
</script>

<style lang="less" scoped>
.el-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
.el-col {
  display: flex;
  align-items: center;
  padding-left: 5px !important;
  /deep/ .text {
    width: 94px;
  }
  span {
    font-size: 14px;
  }
}
</style>
