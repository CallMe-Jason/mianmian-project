<template>
  <div class="choiceAll">
    <!-- 警告框 -->
    <el-alert
      type="info"
      show-icon
      :closable="false"
    >
      <div slot="title">数据一共{{choiceList.length}}条</div>
    </el-alert>
      <!-- /警告框 -->
  <!-- 题库数据列表 -->
    <el-table :data="choiceList" stripe style="width: 100%">
        <!-- 试题编号 -->
      <el-table-column prop="number" label="试题编号" width="150"></el-table-column>
      <!-- 学科 -->
      <el-table-column prop="subject" label="学科" width="100"></el-table-column>
      <!-- 目录 -->
      <el-table-column prop="catalog" label="目录" width="100"></el-table-column>
      <!-- 题型 -->
      <el-table-column label="题型" width="100">
        <template v-slot="scope">
          <div v-if="scope.row.questionType==='1'">单选</div>
          <div v-else-if="scope.row.questionType==='2'">多选</div>
          <div v-else>简答</div>
        </template>
      </el-table-column>
      <!-- 题干 -->
      <el-table-column label="题干" width="280">
        <template v-slot="scope">
          <div v-html="scope.row.question"></div>
        </template>
      </el-table-column>
      <!-- 录入时间 -->
      <el-table-column prop="addDate" label="录入时间" width="165">
        <template v-slot = scope>
          <div>{{scope.row.addDate | formatTime}}</div>
        </template>
      </el-table-column>
      <!-- 难度-->
      <el-table-column label="难度" width="150">
        <template v-slot="scope">
          <div v-if="scope.row.difficulty==='1'">简单</div>
          <div v-else-if="scope.row.difficulty==='2'">一般</div>
          <div v-else>困难</div>
        </template>
      </el-table-column>
      <!-- 录入人-->
      <el-table-column prop="creator" label="录入人" width="150"></el-table-column>
      <!-- 审核状态-->
      <el-table-column prop="chkState" label="审核状态" width="150">
        <template v-slot="scope">
          <div v-if="scope.row.chkState=== 0">待审核</div>
          <div v-else-if="scope.row.chkState=== 2">拒绝</div>
          <div v-else>已审核</div>
        </template>
      </el-table-column>
      <!-- 审核意见-->
      <el-table-column prop="chkRemarks" label="审核意见" width="150"></el-table-column>
      <!-- 审核人-->
      <el-table-column prop="chkUser" label="审核人" width="150"></el-table-column>
      <!-- 发布状态-->
      <el-table-column prop="publishState" label="发布状态" width="150">
        <template v-slot="scope">
          <div v-if="scope.row.publishState=== 0">已下架</div>
          <div v-else-if="scope.row.publishState=== 1">已上架</div>
          <div v-else>待发布</div>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" class="productBtns" width="200" fixed="right">
        <template slot-scope="scope">
        <el-button @click="onToticpPreview(scope.row)" type="text" size="small">预览</el-button>
        <el-button type="text" size="small" @click="onHandleChkState(scope.row)" :disabled="scope.row.chkState===0?false:true">审核</el-button>
        <el-button type="text" size="small" @click="onHandleEdit">修改</el-button>
        <el-button type="text" size="small" @click="onHandlePublish(scope.row)">
          <div v-if="scope.row.publishState === 1">下架</div>
          <div v-else>上架</div>
        </el-button>
        <el-button type="text" size="small" @click="deleteItem(scope.row)">删除</el-button>
      </template>
    </el-table-column>
          <!-- /操作列 -->
  </el-table>
  <!-- 题库数据列表 -->

  <!-- 题目预览对话框-->
  <el-dialog
  :visible.sync="isToticpPreviewShow"
  >
  <div slot="title" class="dialogTitle">题目预览</div>
  <!-- 预览题目组件 -->
  <topic-preview
  @close = "isToticpPreviewShow = false"
  :ToticPrevie = ToticPrevie
  />
  </el-dialog>
  <!-- /题目预览对话框 -->
  <!-- 审核按钮弹框 -->
  <el-dialog
  class="chkDialog"
  :visible.sync="isChkShow"
  title="题目审核"
  >
  <el-form v-model="ChkStateForm" ref="ChkStateFormRef">
    <el-radio-group v-model="ChkStateForm.chkState" class="radios">
      <el-radio v-model="radio" label="1">通过</el-radio>
      <el-radio v-model="radio" label="2">拒绝</el-radio>
    </el-radio-group>
    <el-input
    class="chkTextarea"
    type="textarea"
    :rows="2"
    placeholder="请输入内容"
    v-model="ChkStateForm.chkRemarks"
    >
  </el-input>
  <div class="ChkBtns">
    <el-button @click="isChkShow = false">取 消</el-button>
    <el-button type="primary" @click = "chkStateConfirm">确 定</el-button>
  </div>
  </el-form>
  <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="isChkShow = false">取 消</el-button>
    <el-button type="primary" @click = "chkStateConfirm">确 定</el-button>
  </span> -->
  </el-dialog>
  <!-- /审核按钮弹框 -->
  </div>
</template>
<script>
import TopicPreview from './topic-preview.vue'
import { getChoicePublish, deleteItem, getChkState } from '@/api/choice'
export default {
  name: 'choiceAll',
  components: {
    TopicPreview
  },
  props: {
    choiceList: {
      type: [Array],
      required: true
    }
  },
  data () {
    return {
      // 控制题目弹框的显示状态
      isToticpPreviewShow: false,
      // 预览题目详情
      ToticPrevie: {},
      // 控制审核弹框的显示状态
      isChkShow: false,
      radio: '1',
      // 上下架状态
      asdd: null,
      // 审核状态
      // isChkState: 1
      // ChkStateForm: {
      //   chkState: 1, // 1 通过 2 不通过
      //   chkRemarks: ''
      // }
      ChkStateForm: {},
      // 当前点击的题目id
      ToticpId: null
    }
  },
  created () {
  },
  methods: {
    async deleteItem (val) {
      // console.log(val.id)
      const confirmResult = await this.$confirm('您确认删除这道题目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.error('取消删除')
      }
      try {
        const { data } = await deleteItem(val.id)
        console.log(data, '123')
        this.$message.success('删除成功')
      } catch (err) {
        this.$message('删除失败')
      }
      this.$emit('againGetList')
    },
    // 点击弹出题目预览框
    onToticpPreview (row) {
      // 点击弹框显示
      this.isToticpPreviewShow = true
      // console.log(row)
      this.ToticPrevie = row
    },
    // 点击审核按钮弹框
    onHandleChkState (row) {
      // console.log(row, 111)
      this.ToticpId = row.id
      // console.log(this.ToticpId, 5555)
      this.isChkShow = true
    },
    // 点击审核确定按钮
    async chkStateConfirm () {
      // console.log(this.$refs.ChkStateFormRef, 'ok')
      this.ChkStateForm = this.$refs.ChkStateFormRef.$attrs.value
      console.log(this.ChkStateForm)
      // console.log(this.ToticpId, 5555)
      try {
        // 发请求传数据
        await getChkState(this.ToticpId, {
          chkState: parseInt(this.ChkStateForm.chkState),
          chkRemarks: this.ChkStateForm.chkRemarks,
          id: this.ToticpId
        })
        // console.log(results, 8888)
        // 刷新页面
        this.$emit('againGetList')
      } catch (err) {
        this.$message('审核失败')
      }
      // 关闭弹框
      this.isChkShow = false
      // 重置表单
      this.$refs.ChkStateFormRef.resetFields()
    },
    // 点击修改按钮
    onHandleEdit () {
      this.$router.push('/questions/new')
    },
    // 点击上下架按钮
    async onHandlePublish (row) {
      console.log(row.publishState, '1231312')
      // const asd = this.choiceList.filter((item, index) => {
      // return item.id === row.id
      // })
      // console.log(asd[0].publishState, '1231')
      // row.publishState = 0
      console.log(row)
      // 询问是否需要删除
      const confirmResult = await this.$confirm('您确认下架这道题目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.error('取消删除')
      }
      if (row.publishState === 1) {
        this.asdd = 0
      } else {
        this.asdd = 1
      }
      try {
        await getChoicePublish({
          id: row.id,
          publishState: this.asdd
        })
        if (row.publishState === 0) {
          this.$message.success('上架成功')
          console.log(this.choiceList, '1231312')
          // 更该状态
        } else {
          this.$message.success('下架成功')
        }
        // 改变视图
        this.$emit('againGetList')
      } catch (err) {
        this.$message('更改失败')
      }
    }
  }
}

</script>
<style lang="less" scoped>
.choiceAll {
  .el-table__row {
    height: 71px;
  }
  /deep/.el-dialog {
  border-radius: 10px;
  .el-dialog__header {
    color: #fff;
    background-color: #409EFF;
  }
  .el-dialog__headerbtn {
    .el-dialog__close {
      color: #fff;
    }
  }
  .el-dialog__body {
    .radioItem {
      display: flex;
      flex-direction: column;
      .el-radio {
        padding-top: 14px;
      }
    }
    padding: 10px;
    .previeList {
      .el-col {
        padding: 10px 0;
      }
    }
  }
}
.chkDialog {
  margin-right: 0;
  width: 800px;
  .radios {
    padding: 15px;
  }
  .ChkBtns {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
  }
}
}
</style>
