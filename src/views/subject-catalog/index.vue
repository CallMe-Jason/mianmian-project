<template>
  <div class="subject-catalog">
    <el-card>
      <el-row>
        <el-col :span='18'>
          <el-form>
            <el-form-item label="目录名称">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col
          :span='6'
          style="text-align:right"
        >
          <el-button
            type='success'
            size='small'
            icon='el-icon-edit'
          >
            新增用户
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SubjectCatalog',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {},
}
</script>
<style lang="less" scoped>
.subject-catalog {
  .el-row {
    display: flex;
    align-items: center;
  }
}
</style>