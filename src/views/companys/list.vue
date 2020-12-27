<template>
  <div class="companys-list">
    <el-card class="box-card">
      <!-- 搜索区域 -->
      <list-input @search="loadCompanys" />
      <!-- /搜索区域 -->
      <div class="add-btn">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          @click="addCompanyDialog = true"
          >新增用户</el-button
        >
      </div>

      <!-- 提示区域 -->
      <alert :total="total" />

      <!-- 表格区域 -->
      <el-table :data="companys" border>
        <el-table-column type="index" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="number" label="企业编号" align="center">
        </el-table-column>
        <el-table-column prop="company" label="企业简称" align="center">
        </el-table-column>
        <el-table-column prop="tags" label="标签" align="center">
        </el-table-column>
        <el-table-column prop="creatorID" label="创建者" align="center">
        </el-table-column>
        <el-table-column prop="addDate" label="创建日期" align="center">
        </el-table-column>
        <el-table-column prop="remarks" label="备注" align="center">
        </el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.state === 1 ? "启用" : "禁用" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="onEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="success" size="mini" @click="onState(scope.row)">{{
              scope.row.state === 1 ? "禁用" : "启用"
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemove(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <pageination
        :pagesizes="pagesizes"
        :queryInfo="queryInfo"
        :total="total"
        @change="loadCompanys()"
      />
    </el-card>

    <!-- 创建用户弹出层区域 -->
    <el-dialog
      title="创建用户"
      :visible.sync="addCompanyDialog"
      width="50%"
      @close="onClose"
    >
      <company-add v-if="addCompanyDialog" @close="addCompanyDialog = false" />
    </el-dialog>

    <!-- 编辑用户弹出层 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="updateCompanyDialog"
      width="50%"
      @close="onClose"
    >
      <company-add
        v-if="updateCompanyDialog"
        titleDialog="edit"
        :companyId="companyId"
        @close="updateCompanyDialog = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import ListInput from './components/list-input'
import { getCompanys, updateCompanyState, removeCompanyId } from '@/api/companys'
import CompanyAdd from './components/company-add'
import Alert from '@/components/alert'
import Pageination from '@/components/pagination'

export default {
  name: 'CompanysList',
  components: {
    Alert,
    Pageination,
    ListInput,
    CompanyAdd
  },
  props: {},
  data () {
    return {
      queryInfo: {
        page: 1,
        pagesize: 10
      },
      companys: [],
      total: 0,
      addCompanyDialog: false,
      updateCompanyDialog: false,
      companyId: null,
      pagesizes: [10, 20, 30, 40]
    }
  },
  watch: {},
  computed: {},
  methods: {
    async loadCompanys (params) {
      // console.log(params)
      const query = { ...this.queryInfo, ...params }
      try {
        const { data } = await getCompanys(query)
        // console.log(data)
        this.companys = data.items
        this.total = data.counts
      } catch (err) {
        this.$message('获取数据失败！')
      }
    },

    async onState (row) {
      if (row.state === 0) {
        row.state = 1
        try {
          await updateCompanyState({
            id: row.id,
            state: row.state
          })
          // console.log(data)
        } catch (err) {
          this.$message('操作失败')
        }
      }
      try {
        await this.$confirm('已成功启用, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // console.log(data)

        row.state = 0
        await updateCompanyState({
          id: row.id,
          state: row.state
        })
        // console.log(data)
        this.$message.success('操作成功')
      } catch (err) {
        if (err === 'cancel') return this.$message.info('取消操作')
        this.$message.error('操作失败！')
      }
    },

    onClose () {
      this.loadCompanys()
    },

    onEdit (id) {
      // console.log(id)
      this.companyId = id
      this.updateCompanyDialog = true
    },

    async onRemove (id) {
      // console.log(id)
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await removeCompanyId(id)
        this.$message.success('删除成功')
        this.loadCompanys()
      } catch (err) {
        if (err === 'cancel') return this.$message.info('取消删除')
        this.$message.error('删除失败！')
      }
    }
  },
  created () {
    this.loadCompanys()
  },
  mounted () { }
}
</script>

<style lang="less" scoped>
.companys-list {
  .add-btn {
    text-align: right;
    margin-bottom: 10px;
  }
  /deep/ .el-table th.is-leaf {
    border-bottom: 2px solid #e8e8e8;
    background-color: #fafafa;
  }

  .el-pagination {
    margin-top: 15px;
  }

  /deep/ .el-dialog__footer {
    text-align: center;
  }

  .el-alert {
    margin-bottom: 10px;
  }
}
</style>
