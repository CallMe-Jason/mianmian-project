<template>
  <el-alert
    :title="`共 ${total} 条记录`"
    type="info"
    center
    show-icon
    :closable="false"
  >
  </el-alert>
</template>

<script>
export default {
  name: 'Alert',
  components: {},
  props: {
    total: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>

<style lang="less" scoped>
</style>
