<template>
  <div class="company-add">
    <el-form
      :model="companyForm"
      :rules="companyFormRules"
      ref="companyFormRef"
      label-width="150px"
    >
      <el-form-item label="企业名称" prop="shortName">
        <el-input v-model.trim="companyForm.shortName"></el-input>
        <el-checkbox v-model="companyForm.isFamous">是否为名企</el-checkbox>
      </el-form-item>
      <el-form-item label="所属公司">
        <el-input v-model.trim="companyForm.company"></el-input>
        <p>https://www.tianyancha.com （在此可查询所属公司全称及简称）</p>
      </el-form-item>
      <el-form-item label="城市" prop="province">
        <el-select
          v-model.trim="companyForm.province"
          placeholder="请选择"
          @change="onChange"
        >
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select v-model.trim="companyForm.city" placeholder="请选择">
          <el-option
            v-for="item in areaList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="方向（企业标签）" prop="tags">
        <el-input v-model.trim="companyForm.tags"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model.trim="companyForm.remarks"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item class="company-btn">
        <el-button @click="$emit('close')">取 消</el-button>
        <el-button type="primary" @click="onAddCompany">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import citydata from '../citydata'
import { addCompany, getCompanyId, UpdateCompanyId } from '@/api/companys'

export default {
  name: 'CompanyAdd',
  components: {},
  props: {
    titleDialog: {
      type: String,
      default: 'add'
    },
    companyId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      cityList: citydata,
      areaList: [],
      companyForm: {
        isFamous: false, // 是否名企
        shortName: '', // 企业简称
        company: '', // 所属公司
        province: '', // 省份
        city: '', // 城市
        tags: '', // 标签
        remarks: '' // 备注
      },
      companyFormRules: {
        shortName: [
          { required: true, message: '企业简称不能为空', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '城市不能为空', trigger: 'blur' }
        ],
        tags: [
          { required: true, message: '企业标签不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    onChange (value) {
      // console.log(value)
      const item = this.cityList.find(item => item.label === value)
      // console.log(item)
      this.areaList = item.children
      this.companyForm.city = item.children[0].label
    },

    onAddCompany () {
      this.$refs.companyFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return false
        if (this.titleDialog === 'add') {
          try {
            await addCompany(this.companyForm)
            // console.log(data)
            this.$message.success('添加成功！')
            this.$emit('close')
          } catch (err) {
            this.$message.error('添加失败！')
          }
        } else {
          try {
            if (this.companyForm.isFamous === 0) {
              this.companyForm.isFamous = false
            }
            await UpdateCompanyId(this.companyId, this.companyForm)
            // console.log(data)
            this.$message.success('修改成功！')
            this.$emit('close')
          } catch (err) {
            this.$message.error('修改失败！')
          }
        }
      })
    },

    async loadCompanyId () {
      if (this.titleDialog === 'edit') {
        try {
          const { data } = await getCompanyId(this.companyId)
          // console.log(data)
          this.companyForm = data
        } catch (err) {
          this.$message('获取数据失败')
        }
      }
    }
  },
  created () {
    this.loadCompanyId()
  },
  mounted () { }
}
</script>

<style lang="less" scoped>
.company-add {
  .el-form-item {
    width: 650px;
  }
  .company-btn {
    text-align: center;
  }
}
</style>
