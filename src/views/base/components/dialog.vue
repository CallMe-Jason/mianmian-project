<template>
<div class="permission-dialog">
  <el-dialog
      class="el-permission-dialog"
      title="创建权限组"
      :visible.sync="visible"
      width="60%"
      @close="$emit('input',false)">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('input',false)">取 消</el-button>
        <el-button type="primary" @click="BasePermissionVisible">确 定</el-button>
      </span>
  </el-dialog>
</div>
</template>
<script>
export default {
  name: 'Dialog',
  // 组件
  components: {},
  props: {
    value: {
      type: Boolean
    }
  },
  data () {
    return {
      visible: false,
      ruleForm: {
        name: ''

      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {
    value () {
      this.visible = this.value
    }
  },
  created () {},
  mounted () {},
  // 方法
  methods: {
    BasePermissionVisible () {
      this.$emit('input', false)
    }
  }
}
</script>
<style scoped lang='less'>
/deep/.permission-dialog{

  .el-dialog__header{
    background-color: pink;
  }
}
</style>
