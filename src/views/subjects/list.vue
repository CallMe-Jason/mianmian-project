<template>
  <div class="SubjectsList">
    <el-breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>学科管理</el-breadcrumb-item>
      <el-breadcrumb-item>学科</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索以及新增 -->
      <el-row>
        <el-col :span="18">
          <search @search='searchSon' />
        </el-col>
        <el-col :span="6">
          <el-button type="success" icon="el-icon-edit" size="mini" @click="dialogVisibleAdd = true">新增学科</el-button>
        </el-col>
      </el-row>
      <el-alert type="info" left :closable="false" show-icon>
        <div slot="title">数据一共 {{list.counts}} 条</div>
      </el-alert>
       <el-table
      :data="list.items">
      <el-table-column
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="subjectName"
        label="学科名称">
      </el-table-column>
      <el-table-column
        prop="username"
        label="创建者">
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="160px">
        <template slot-scope="scope">
          <div> {{ scope.row.addDate | formatTime }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="前台是否显示">
        <template slot-scope="scope">
          <div v-if="scope.row.isFrontDisplay === 1">是</div>
          <div v-else>否</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="twoLevelDirectory"
        label="二级目录">
      </el-table-column>
      <el-table-column
        prop="tags"
        label="标签">
      </el-table-column>
      <el-table-column
        prop="totals"
        label="题目数量">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
        width="240px">
        <template slot-scope="scope">
          <span>学科分类</span>
          <span>学科标签</span>
          <span @click="EditItem(scope.row)">修改</span>
          <span @click="deleteItem(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
      class="pag"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.page"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="10"
      layout="prev, pager, next, sizes, jumper"
      :total="list.counts">
      </el-pagination>
    </el-card>
    <!-- 添加弹框 -->
    <el-dialog title="新增学科" :visible.sync="dialogVisibleAdd" width="30%">
      <el-form ref="formRef" :model="formadd" label-width="70px">
        <el-form-item label="活动名称">
          <el-input v-model="formadd.name" size="mini" placeholder="请输入学科"></el-input>
        </el-form-item>
      </el-form>
      <div class="span">是否显示</div>
      <el-switch v-model="valueadd" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="sureAdd" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改弹框 -->
    <el-dialog title="修改学科" :visible.sync="dialogVisibleEdit" width="30%">
      <el-form ref="formRef" :model="formedit" label-width="70px">
        <el-form-item label="活动名称">
          <el-input v-model="formedit.name" size="mini" placeholder="请输入学科"></el-input>
        </el-form-item>
      </el-form>
      <div class="span">是否显示</div>
      <el-switch v-model="valueedit" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSubjectsList, addSubject, deleteSubject, editSubject } from '@/api/subjects'
import Search from './components/search'

export default {
  name: 'SubjectsList',
  props: {

  },
  components: {
    Search
  },
  created () {
    this.getList()
  },
  data () {
    return {
      formedit: {
        name: ''
      },
      valueedit: true,
      formadd: {
        name: ''
      },
      valueadd: true,
      page: 1,
      pagesize: 10,
      isok: false,
      list: [],
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      subjectId: 0
    }
  },
  methods: {
    // 修改事件
    async edit () {
      let status = 0
      if (this.valueedit === true) {
        status = 1
      } else {
        status = 2
      }
      try {
        const { data } = await editSubject(this.subjectId, {
          subjectName: this.formedit.name,
          isFrontDisplay: status,
          id: this.subjectId
        })
        this.$message.success('修改成功')
        this.getList()
      } catch (err) {
        this.$message('修改失败')
      }
      this.dialogVisibleEdit = false
    },
    // 参数赋值
    EditItem (val) {
      console.log(val)
      this.subjectId = val.id
      this.dialogVisibleEdit = true
      this.formedit.name = val.subjectName
      if (val.isFrontDisplay === 1) {
        this.valueedit = true
      } else {
        this.valueedit = false
      }
    },
    // 删除事件
    async deleteItem (val) {
      const confirmResult = await this.$confirm('此操作将永久删除该参数，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 用户取消了删除的操作
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data } = await deleteSubject(val.id)
      this.$message.success('删除成功')
      this.getList()
    },
    // 添加事件
    async sureAdd () {
      try {
        if (this.valueadd === true) {
          this.valueadd = 1
        } else {
          this.valueadd = 0
        }
        // console.log(this.valueadd, '状态')
        const { data } = await addSubject({
          subjectName: this.formadd.name,
          isFrontDisplay: this.valueadd
        })
        this.$message.success('添加成功')
        this.formadd.name = ''
        console.log(this.valueadd)
        this.getList()
      } catch (err) {
        this.$message('添加失败')
      }
      this.dialogVisibleAdd = false
      // console.log(this.formadd.name, '22')
      // console.log(this.valueadd, '11')
    },
    // 搜索子组件传过来的值
    searchSon (val) {
      console.log(val)
      this.list = val
    },
    handleCurrentChange (val) {
      // console.log(val, this.query.page)
      this.page = val
      this.getList()
    },
    handleSizeChange (val) {
      // console.log(val, 'size')
      this.pagesize = val
      this.getList()
    },
    async getList () {
      try {
        const { data } = await getSubjectsList({
          page: this.page,
          pagesize: this.pagesize
        })
        console.log(data, '233')
        this.list = data
        this.isok = true
      } catch (err) {
        this.$message('获取失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.el-table {
  margin-bottom: 10px;
}
.el-alert {
  margin-bottom: 10px;
}
/deep/ th {
  background-color: rgb(244, 244, 244);
}
.dialog-footer {
  .el-button {
    margin: 0 10px 0 0!important;
    // padding-right: 10px;

  }
}
.SubjectsList {
  .el-button {
    margin-left: 180px;
  }
}
.pag {
  text-align: right;
}
span {
  font-size: 14px;
  margin-left: 10px;
  color: rgb(70, 160, 252);
  cursor: pointer;
}
/deep/ .el-dialog__header {
  // border-radius-t: 10px;
  background-color: rgb(70, 160, 252);
  .el-dialog__title {
     color: #fff;
  }
  .el-dialog__close {
    color: #fff;
  }
}
/deep/ .el-dialog {
  border-radius: 10px;
  overflow: hidden;
  .span {
    display: inline-block;
    padding-right: 15px;
  }
}
</style>
