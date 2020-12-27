<template>
  <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.page"
    :page-sizes="pagesizes"
    :page-size="queryInfo.pagesize"
    layout="prev, pager, next, sizes, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'Pageination',
  components: {},
  props: {
    queryInfo: {
      type: Object,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    pagesizes: {
      type: Array,
      defalut: [10, 20, 30, 50]
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.$emit('change')
    },
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage
      this.$emit('change')
    }
  },
  created () { },
  mounted () { }
}
</script>

<style lang="less" scoped>
</style>
