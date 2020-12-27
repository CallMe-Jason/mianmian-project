<template>
  <div class="qusetion-container">
    <el-row>
      <el-col :span="6" v-if="basiclist.questionType === '1'">
        【题型】:单选题
      </el-col>
      <el-col :span="6" v-else-if="basiclist.questionType === '2'">
        【题型】:多选题
      </el-col>
      <el-col :span="6" v-else>
        【题型】:简单题
      </el-col>
      <el-col :span="6">【编号】：{{ basiclist.id }}</el-col>
      <el-col :span="6" v-if="basiclist.difficulty === '1'"
        >【难度】：简单</el-col
      >
      <el-col :span="6" v-else-if="basiclist.difficulty === '2'"
        >【难度】：一般</el-col
      >
      <el-col :span="6" v-else>【难度】：困难</el-col>
      <el-col :span="6">【标签】：{{ basiclist.tags }}</el-col>
      <el-col :span="6">【学科】：{{ basiclist.subjectName }}</el-col>
      <el-col :span="6">【目录】：{{ basiclist.directoryName }}</el-col>
      <el-col :span="6">【方向】：{{ basiclist.direction }}</el-col>
    </el-row>
    <hr />
    【题干】：
    <div style="color: blue;" v-html="basiclist.question"></div>
    <div>
      <div style="padding-bottom: 5px;">
        单选题 选项：（以下选中的选项为正确答案）
      </div>
      <div
        style="padding: 8px 0px;"
        v-for="item in basiclist.options"
        :key="item.id"
      >
        <el-radio v-model="radio" :label="item.isRight">{{
          item.title
        }}</el-radio>
      </div>
    </div>
    <hr />
    【参考答案】：
    <el-button type="danger" size="small" @click="isVideoShow = true"
      >视频答案预览</el-button
    >
    <!-- 视频显示 -->
    <div class="video" v-if="isVideoShow">
      <video
        controls="controls"
        autoplay
        :src="basiclist.videoURL"
        class="videoURL"
      ></video>
    </div>
    <hr />
    【答案解析】：
    <div style="display: inline-block;" v-html="basiclist.answer"></div>
    <hr />
    【题目备注】： {{ basiclist.remarks }}
  </div>
</template>
<script>
export default {
  name: 'QusetionIndex',
  // 组件
  components: {},
  props: {
    basiclist: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 选中意味着变量的值为相应 Radio label属性的值，
      radio: 1,
      // 是否显示视频
      isVideoShow: false
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
<style scoped lang="less"></style>
