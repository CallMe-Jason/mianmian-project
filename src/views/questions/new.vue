<template>
  <div class="QuestionsNew">
    <!-- 卡片区域 -->
    <el-card>
      <!-- 头部区域 -->
      <div slot="header">
        <div>试题录入</div>
      </div>
      <!-- /头部区域 -->
      <el-form :model="ruleForm" ref="ruleFormRef" :rules="rules">
        <!-- 学科 -->
        <el-form-item label="学科:" prop="subject">
          <el-select
            v-model="ruleForm.subject"
            placeholder="请选择"
            size="medium"
            @change="changeSubject"
          >
            <el-option
              v-for="item in subjectlist"
              :key="item.id"
              :label="item.subjectName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- /学科 -->
        <!-- 目录 -->
        <el-form-item label="目录:" prop="directory">
          <el-select
            v-model="ruleForm.directory"
            placeholder="请选择"
            size="medium"
          >
            <el-option
              v-for="item in directorylist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- /目录 -->
        <!-- 企业 -->
        <el-form-item label="企业:" prop="company">
          <el-select
            v-model="ruleForm.company"
            placeholder="请选择"
            size="medium"
          >
            <el-option
              v-for="item in companylist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- /企业 -->
        <!-- 城市 -->
        <el-form-item label="城市:" class="ctiy" prop="ctiy">
          <el-select
            class="left"
            size="small"
            v-model="ruleForm.ctiy"
            placeholder="请选择"
            @change="changeCity"
          >
            <el-option
              v-for="(item, index) in datas"
              :key="index"
              :value="item.city"
              :label="item.city"
            ></el-option>
          </el-select>
          <el-select
            class="right"
            size="small"
            v-model="ruleForm.value"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in areaCtiyList"
              :key="index"
              :value="item"
              :label="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- /城市 -->
        <!-- 方向 -->
        <el-form-item label="企业:" prop="directions">
          <el-select
            v-model="ruleForm.directions"
            placeholder="请选择"
            size="medium"
          >
            <el-option
              v-for="item in direction"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- /方向 -->
        <!-- 题型 -->
        <el-form-item label="题型:" prop="questionType">
          <el-radio-group v-model="radio">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- /题型 -->
        <!-- 难度 -->
        <el-form-item label="难度:" prop="difficulty">
          <el-radio-group v-model="radios">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- /难度 -->
        <!-- 题干 -->
        <el-form-item label="题干:" prop="question">
          <!-- 副文本编译器组件 v-model将里面的内容双向绑定到data中-->
          <quill-editor v-model="ruleForm.questions" :options="editorOption">
          </quill-editor>
        </el-form-item>
        <!-- /题干 -->
        <!-- 选项 -->
        <el-form-item label="选项:" prop="option">
          <div class="option_item" v-for="item in optionList" :key="item.value">
            <el-radio v-model="optionRadio" :label="item.value"
              >{{ item.label }}:
            </el-radio>
            <!-- input输入框 -->
            <el-input v-model="options"></el-input>
            <!-- 上传图片 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadURL"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :show-file-list="false"
            >
              <span>上传图片</span>
              <i class="el-icon-circle-close"></i>
            </el-upload>
          </div>
          <el-button type="danger" size="small" disabled
            >+增加选项与答案</el-button
          >
        </el-form-item>
        <!-- /选项 -->
        <!-- 解析视频 -->
        <el-form-item label="解析视频:">
          <el-input></el-input>
        </el-form-item>
        <!-- /解析视频 -->
        <!-- 答案解析 -->
        <el-form-item label="答案解析">
          <quill-editor v-model="ruleForm.questions" :options="editorOption">
          </quill-editor>
        </el-form-item>
        <!-- /答案解析 -->
        <!-- 题目备注 -->
        <el-form-item label="题目备注">
          <el-input
            type="textarea"
            v-model="ruleForm.textarea"
            size="medium"
          ></el-input>
        </el-form-item>
        <!-- /题目备注 -->
        <!-- 试题标签 -->
        <el-form-item label="试题标签:" prop="tag">
          <el-select v-model="ruleForm.tag" placeholder="请选择" size="medium">
            <el-option
              v-for="item in taglist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- /试题标签 -->
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" size="medium" @click="formSuccess"
            >确认提交</el-button
          >
        </el-form-item>
        <!-- /提交按钮 -->
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getSubjects,
  getDirectorys,
  getCompany,
  getTags
  // addQusetion
} from '@/api/qusetion'
import { datas } from '@/utils/citys'
import { direction } from '@/utils/direction'
export default {
  name: 'QuestionsNew',
  props: {},
  components: {},
  created() {
    this.getSubjectList()
    this.getCompanyList()
  },
  data() {
    return {
      ruleForm: {
        subject: '',
        directory: '',
        company: '',
        ctiy: '',
        directions: '',
        questionType: '',
        difficulty: '',
        vlue: '',
        questions: '',
        options: '',
        textarea: '',
        tag: ''
      },

      // 获取学科的数组
      subjectlist: [],
      // 获取目录的详情
      directorylist: [],
      // 企业详情
      companylist: [],
      // 城市
      datas,

      areaCtiyList: [],
      // 方向
      direction,
      radio: 2,
      radios: 1,
      // 题干

      optionRadio: 1,

      taglist: [],

      rules: {
        subject: [{ required: true, message: '请选择学科', trigger: 'blur' }],
        directory: [{ required: true, message: '请选择目录', trigger: 'blur' }],
        company: [{ required: true, message: '请选择企业', trigger: 'blur' }],
        ctiy: [{ required: true, message: '请选择地区', trigger: 'blur' }],
        directions: [
          { required: true, message: '请选择地区', trigger: 'blur' }
        ],
        questionType: [{ required: true, message: '请选择', trigger: 'blur' }],
        difficulty: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            ['image', 'link']
          ]
        }
      },
      // 上传图片地址
      uploadURL: 'https://jsonplaceholder.typicode.com/posts/',
      optionList: [
        { value: 1, label: 'A' },
        { value: 2, label: 'B' },
        { value: 3, label: 'C' },
        { value: 4, label: 'D' }
      ]
    }
  },
  methods: {
    async getSubjectList() {
      try {
        const { data } = await getSubjects()
        console.log(data, 11)
        this.subjectlist = data.items
      } catch (err) {
        this.$message.error('获取学科数据失败')
      }
    },
    // 当学科发生变化时
    async changeSubject(value) {
      try {
        // 获取目录
        const { data } = await getDirectorys({
          subjectID: value
        })
        console.log(data)
        this.Directorylist = data

        const { data: res } = await getTags({
          subjectID: value
        })
        console.log(res)
        this.taglist = res
      } catch (err) {
        this.$message.error('获取目录数据失败')
      }
    },
    // 企业的数据
    async getCompanyList() {
      try {
        const { data } = await getCompany()
        console.log(data)
        this.companylist = data
      } catch (err) {}
    },
    // 当城市发生改变时this.datas.forEach()
    changeCity(val) {
      // console.log(val, '111')
      const areaList = this.ruleForm.datas.filter((item, index) => {
        return item.city === val
      })
      console.log(areaList[0].area, '11211')
      this.areaCtiyList = areaList[0].area
    },
    // 处理图片预览效果
    handleSuccess(response) {
      console.log(response)
    },
    // 处理图片移除事件，可以得到要删除的那个文件列表的信息
    handleRemove(file) {
      console.log(file)
    },
    formSuccess() {
      console.log(this.$refs.ruleFormRef)
      this.$refs.ruleFormRef.resetFields()
      // this.$refs.ruleFormRef.validateField(async valid => {
      //   try {
      //     const { data } = await addQusetion({})
      //     console.log(data)
      //   } catch (err) {}
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.QuestionsNew {
  /deep/.el-form {
    .el-form-item__label {
      width: 120px;
    }
    .el-form-item__content {
      margin-left: 120px;
    }
  }
  .el-select,
  .el-input,
  .el-textarea {
    width: 400px;
  }
  .ctiy {
    .el-select {
      width: 198px;
    }
    .right {
      margin-left: 4px;
    }
  }
  /deep/.el-input__inner {
    height: 36px;
    line-height: 36px;
  }
  .option_item {
    padding-bottom: 20px;
    .el-radio {
      margin-right: 0;
    }
    .el-input {
      width: 240px;
    }
    .avatar-uploader[data-v-0207c334] {
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
    }
    /deep/.avatar-uploader .el-upload {
      margin-left: 4px;

      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      width: 100px;
      height: 60px;
      line-height: 60px;
    }
    .avatar-uploader i {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
      background: #fff;
      font-size: 18px;
      color: #999;
    }
  }
}
</style>
