<template>
  <div class="topic-preview">
    <div class="el-dialog__body">
      <el-row :gutter="10" class="previeList">
        <el-col :span="6">【题型】：
          <span v-if="ToticPrevie.questionType==='1'">单选</span>
          <span v-else-if="ToticPrevie.questionType==='2'">多选</span>
          <span v-else>简答</span>
        </el-col>
        <el-col :span="6">【编号】：{{ToticPrevie.id}}</el-col>
        <el-col :span="6">【难度】：
          <span v-if="ToticPrevie.difficulty==='1'">简单</span>
          <span v-else-if="ToticPrevie.difficulty==='2'">一般</span>
          <span v-else>困难</span>
        </el-col>
        <el-col :span="6">【标签】：{{ToticPrevie.tags}}</el-col>
        <el-col :span="6">【学科】：{{ToticPrevie.subject}}</el-col>
        <el-col :span="6">【目录】：{{ToticPrevie.catalog}}</el-col>
        <el-col :span="6">【方向】：{{ToticPrevie.direction}}</el-col>
      </el-row>
      <hr/>
      【题干】：
      <div v-html="ToticPrevie.question"></div>
      <div>单选题 选项：（以下选中的选项为正确答案）</div>
      <el-radio-group v-model="radio" class="radioItem">
        <el-radio :label="3">语法错误</el-radio>
        <el-radio :label="6">语法正确</el-radio>
        <el-radio :label="9">不知道</el-radio>
        <el-radio :label="9">不确定</el-radio>
      </el-radio-group>
      <div></div>
      <hr/>
      <div>
        <span>【参考答案】：</span>
        <el-button type="danger" size="small" @click="onHandleAnswer">视频答案预览</el-button>
        <!-- <video src=ToticPrevie.videoURL></video> -->
      </div>
      <div class="answerVideo">
        <video width="400" height="300" controls autoplay v-if="isAnswerVideoShow">
          <source src="https://v-cdn.zjol.com.cn/276984.mp4" type="video/mp4">
        </video>
      </div>
      <hr/>
      【答案解析】：<span v-html=ToticPrevie.answer></span>
      <hr/>
      <div>【题目备注】：{{ToticPrevie.remarks}}</div>
      <hr/>
    </div>
    <div class="el-dialog__footer">
      <el-button @click="$emit('close')" type="primary">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopicPreview',
  components: {},
  props: {
    ToticPrevie: {
      type: [Object],
      required: true
    }
  },
  data () {
    return {
      isAnswerVideoShow: false,
      radio: 2
    }
  },
  methods: {
    onHandleAnswer () {
      this.isAnswerVideoShow = !this.isAnswerVideoShow
    }
  }
}
</script>

<style lang="less" scoped>
</style>
