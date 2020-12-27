<template>
 <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="100px" class="demo-ruleForm">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-button type="info" @click="reset">清空</el-button>
 </el-form>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: ''
      },
      rules: {
        name: [
          { required: true }
        ],
        region: [
          { required: true }
        ],
        date1: [
          { required: true }
        ],
        date2: [
          { required: true }
        ]
      }
    }
  },
  methods: {
    reset () {
      // console.log(this.$refs.ruleFormRef)
      this.$refs.ruleFormRef.resetFields()
    }
  }
}
</script>

<style lang='less' scoped>
.demo {
  background-color: pink;
}
</style>
