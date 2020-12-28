<template>
  <div class="from-container">
    <div class="btn_wrapper">
      <span style="font-size: 12px; color: pink;">
        说明：目前支持学科和关键字条件筛选
      </span>
      <el-button type="success" size="small" icon="el-icon-edit"
        >新增试题</el-button
      >
    </div>
    <!-- 表单区域 -->
    <el-form :model="ruleForm" ref="ruleFormRef">
      <el-col :span="6">
        <el-form-item label="学科" prop="subject">
          <el-select
            size="small"
            placeholder="请选择"
            v-model="ruleForm.subject"
            @change="Change"
          >
            <el-option
              v-for="item in subjectlist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="二级目录" prop="directory">
          <el-select
            size="small"
            placeholder="请选择"
            v-model="ruleForm.directory"
          >
            <el-option
              v-for="item in Directorylist"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="标签" prop="tag">
          <el-select size="small" placeholder="请选择" v-model="ruleForm.tag">
            <el-option
              v-for="item in taglist"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="关键字" prop="inputValue"
          ><el-input
            size="small"
            v-model="ruleForm.inputValue"
            placeholder="根据题干搜索"
          ></el-input
        ></el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="试题类型" prop="option">
          <el-select
            size="small"
            placeholder="请选择"
            v-model="ruleForm.option"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="难度" prop="difficulty">
          <el-select
            size="small"
            placeholder="请选择"
            v-model="ruleForm.difficulty"
          >
            <el-option
              v-for="item in difficultylist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="方向" prop="directions">
          <el-select
            size="small"
            placeholder="请选择"
            v-model="ruleForm.directions"
          >
            <el-option
              v-for="item in direction"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="录入人" prop="user">
          <el-select size="small" placeholder="请选择" v-model="ruleForm.user">
            <el-option
              v-for="item in userlist"
              :key="item.value"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="题目备注" prop="titleValue">
          <el-input size="small" v-model="ruleForm.titleValue"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="企业简称" prop="businessValue">
          <el-input size="small" v-model="ruleForm.businessValue"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="城市" class="city" prop="city">
          <el-select
            class="left"
            size="small"
            v-model="ruleForm.city.citys"
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
            v-model="ruleForm.city.areaCtiyListvalue"
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
      </el-col>
      <el-col :span="6">
        <el-form-item class="last">
          <el-button size="small" @click="resetForm">清除</el-button>
          <el-button
            type="primary"
            size="small"
            @click="$emit('query-qusetion', filterData)"
            >搜索</el-button
          >
        </el-form-item>
      </el-col>
    </el-form>
    <!-- /表单区域 -->
  </div>
</template>
<script>
import { datas } from '@/utils/citys'
import { direction } from '@/utils/direction'
import { getSubjects, getDirectorys, getTags, getUser } from '@/api/qusetion'
export default {
  name: 'FormIndex',
  // 组件
  components: {},
  props: {},
  data() {
    return {
      // 表单数据
      ruleForm: {
        // 学科
        subject: '',
        // 二级目录
        directory: '',
        // 标签
        tag: '',
        // 关键字输入内容
        inputValue: '',
        // 试题类型
        option: '',
        // 难度
        difficulty: '',
        // 方向
        directions: '',
        // 题目备注输入内容
        titleValue: '',
        // 企业简称
        businessValue: '',
        // 录入人
        user: '',
        // 城市
        city: [{ citys: '' }, { areaCtiyListvalue: '' }]
      },
      // 获取学科数据的数组
      subjectlist: {},
      // 获取目录
      Directorylist: {},
      // 获取标签数据
      taglist: [],
      // 试题类型
      options: [
        {
          value: '1',
          label: '单选'
        },
        {
          value: '2',
          label: '多选'
        },
        {
          value: '3',
          label: '简单'
        }
      ],
      // 难度
      difficultylist: [
        {
          value: '1',
          label: '简单'
        },
        {
          value: '2',
          label: '一般'
        },
        {
          value: '3',
          label: '困难'
        }
      ],
      direction,
      // 用户数据
      userlist: [],

      // 省市级数据源
      datas,
      // 地区列表
      areaCtiyList: [],
      page: 1, // 当前的页数
      pagesize: 10 // 当前页数尺寸
    }
  },
  // 计算属性
  computed: {
    // 筛选出当前选择的数据
    filterData() {
      return {
        // 当前页数
        page: this.page,
        pagesize: this.pagesize,
        subjectID: this.ruleForm.subject,
        difficulty: this.ruleForm.directory,
        directory: this.ruleForm.option,
        tags: this.ruleForm.tag,
        province: this.ruleForm.city.citys,
        city: this.ruleForm.city.areaCtiyListvalue,
        keyword: this.ruleForm.inputValue,
        remarks: this.ruleForm.titleValue,
        shortName: this.ruleForm.businessValue,
        direction: this.ruleForm.directions,
        creatorID: this.ruleForm.user,
        catalogID: this.ruleForm.directory
      }
    }
  },
  // 监听
  watch: {},
  created() {
    this.getSubjectList()
    this.getUser()
  },
  mounted() {},
  // 方法
  methods: {
    async getSubjectList() {
      try {
        const { data } = await getSubjects()
        console.log(data, 11)
        this.subjectlist = data
      } catch (err) {
        this.$message.error('获取学科数据失败')
      }
    },
    async Change(value) {
      // console.log(value)
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
      } catch (err) {}
    },
    async getUser() {
      const { data } = await getUser()
      console.log(data)
      this.userlist = data
    },

    // 当城市发生改变时this.datas.forEach()
    changeCity(val) {
      // console.log(val, '111')
      const areaList = this.datas.filter((item, index) => {
        return item.city === val
      })
      console.log(areaList[0].area, '11211')
      this.areaCtiyList = areaList[0].area
      console.log(this.areaCtiyList, '111')
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleFormRef.resetFields()
    }
  }
}
</script>
<style scoped lang="less">
.btn_wrapper {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
.el-row {
  margin: 0 !important;
}
.el-col {
  padding: 0 !important;
}
/deep/.el-form-item {
  margin-bottom: 18px;
  // display: flex;
  // margin-left: 80px;
  .el-form-item__label {
    width: 80px;
  }
  .el-form-item__content {
    margin-left: 80px;
  }
}
.el-select {
  width: 100%;
}
.left {
  width: 48%;
  margin-right: 2%;
}
.right {
  width: 50%;
}
.last {
  text-align: right;
}
</style>
