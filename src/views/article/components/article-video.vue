<template>
  <div class="article-video">
    <video :src="video" autoplay :muted="false"></video>
  </div>
</template>

<script>
export default {
  name: 'ArticleVideo',
  components: {},
  props: {
    video: {
      type: String,
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
.article-video {
  video {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}
</style>
