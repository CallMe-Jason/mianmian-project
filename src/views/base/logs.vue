<template>
  <div class="logs-container">
    <el-breadcrumb>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>日志</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区域 -->
    <el-card>
      <!-- Alert 警告 -->
      <el-alert type="info" show-icon :closable="false">共 {{LogsList.length}} 条记录</el-alert>
      <!-- 日志列表区域 -->
      <el-table :data="LogsList" style="width: 100%" border="">
        <el-table-column prop="operation" label="操作类型" width="180" align="center">
        </el-table-column>
        <el-table-column prop="operator" label="操作人" width="180" align="center">
        </el-table-column>
        <el-table-column prop="result" label="执行结果" align="center"> </el-table-column>
          <el-table-column prop="operationTime" label="操作时间" align="center">
        </el-table-column>
          <el-table-column prop="describe" label="描述" align="center">
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
        <el-pagination
      :page-sizes="[10, 20, 30, 50]"
      :page-size="100"
      layout="sizes, prev, pager, next, jumper"
      :total="50"
      background
      >
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'LogsIndex',
  props: {},
  data () {
    return {
      // 日志的数据
      LogsList: [{
        id: 1,
        operation: 'EU',
        operator: '田志成',
        result: '今天有几个年轻人不讲武德偷袭五十三岁的老师傅，很快啊',
        operationTim: '2020-12-12 08.21.20',
        describe: 67.83
      }, {
        id: 2,
        operation: 'CN',
        operator: '摩的侠王奇',
        result: '高速公路开着我的宝贝摩的，公婆看了眼红想和我比一比我说比就比谁怕谁。',
        operationTim: '2016-12-02 18.02.12',
        describe: 46.99
      }, {
        id: 3,
        operation: 'JP',
        operator: '胡显',
        result: '今天田志成还是拒绝了我，下起雨了，我说的不是天气',
        operationTime: '1976-04-19 03:11:14',
        describe: 9.39
      }, {
        id: 4,
        operation: 'CN',
        operator: '炸弹人奇奇',
        result: '今天我拿雷管去炸牛粪，真刺激',
        operationTime: '2008-05-23 11:47:35',
        describe: 65.95
      }, {
        id: 5,
        operation: 'CN',
        operator: '熊戈',
        result: '熊大熊二我们要一起保护狗熊岭阻止光头强继续砍树',
        operationTime: '2004-11-10 02:58:42',
        describe: 15.55
      }, {
        id: 6,
        operation: 'JP',
        operator: '聂婷',
        result: '可爱又迷人的反派角色，飞天小女警前来报到',
        operationTime: '2018-10-30 06:46:55',
        describe: 25.35
      }, {
        id: 7,
        operation: 'US',
        operator: '刘憨憨',
        result: '怎么又这么多bug，我不做人了JOJO',
        operationTime: '1989-10-29 08:22:51',
        describe: 15.55
      }, {
        id: 8,
        operation: 'US',
        operator: '吴酱',
        result: '感受二刺螈的力量吧，木大木大木大',
        operationTime: '2019-12-27 21:00:48',
        describe: 4.85
      }, {
        id: 9,
        operation: 'CN',
        operator: '贵利崽威汁郭',
        result: '兰桂坊是你想停就停的地方吗',
        operationTime: '2007-02-07 13:10:39',
        describe: 18.96
      }, {
        id: 10,
        operation: 'FB',
        operator: '王司徒',
        result: '两军阵前竟敢倒悬打xx,一只王八，呜哇哇哇哇哇',
        operationTime: '2002-02-21 06:53:20',
        describe: 44.26
      }, {
        id: 11,
        operation: 'EU',
        operator: '葛平',
        result: '快看那个小朋友全身都穿着我们蓝猫品牌的衣服',
        operationTime: '1998-05-19 22:27:18',
        describe: 29.54
      }, {
        id: 12,
        operation: 'CN',
        operator: '庞麦郎',
        result: '一步两布似爪牙，似魔鬼的步伐',
        operationTime: '2004-12-11 00:44:46',
        describe: 47.02
      }, {
        id: 13,
        operation: 'US',
        operator: '成龙',
        result: '用了霸王洗发水头发Duang的一下就窜出来了',
        operationTime: '2004-12-11 00:44:46',
        describe: 42.02
      }, {
        id: 14,
        operation: 'EG',
        operator: '袁华',
        result: '不! 这道题我不会做，我不会做',
        operationTime: '2014-02-12 00:44:46',
        describe: 42.02
      }, {
        id: 15,
        operation: 'US',
        operator: '面筋哥',
        result: '烤面筋，烤面筋，我的烤面筋',
        operationTime: '2004-11-10 02:58:42',
        describe: 65.95
      }]
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin: 15px 0;
}
/deep/ th {
  background-color: #fafafa!important;
}
</style>
