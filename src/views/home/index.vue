<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header class="header-container">
      <!-- 头部左边区域 -->
      <div class="header-left">
        <div class="sidebar-logo">
          <img
            src="~@/assets/logo2.png"
            alt=""
          />
        </div>
        <i class="el-icon-s-fold"></i>
        <span class="panel-text">面板</span>
      </div>
      <div class="header-right">
        <el-tooltip
          effect="dark"
          content="站内搜索"
          placement="bottom"
        >
          <i
            class="el-icon-search mr-10"
            @click="sreach"
          ></i>
        </el-tooltip>
        <el-input
          v-if="isSreach"
          v-model="sreachValue"
          placeholder="请输入内容"
          ref="sreach"
          @blur="onBlur"
        ></el-input>

        <el-tooltip
          effect="dark"
          content="全屏"
          placement="bottom"
        >
          <i class="el-icon-full-screen mr-10"></i>
        </el-tooltip>
        <!-- 颜色选择器 -->
        <el-tooltip
          effect="dark"
          content="换肤"
          placement="bottom"
        >
          <el-color-picker
            class="mr-10"
            v-model="color"
          ></el-color-picker>
        </el-tooltip>

        <!-- 下拉菜单 -->
        <el-dropdown
          class="mr-10"
          @command="onCommand"
        >
          <span class="el-dropdown-link">
            {{ userProfile.name
              }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="main">首页</el-dropdown-item>
            <el-dropdown-item
              divided
              command="quit"
            >退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧 -->
      <el-aside
        width="200px"
        class="asider-container"
      >
        <el-menu
          unique-opened
          :router="true"
        >
          <el-menu-item :index="'/dashboard'">
            <i class="mianmian mianmian-dashboard"></i>
            <span>
              <span>数据概览</span>
            </span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="mianmian mianmian-people"></i>
              <span>后台管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="'/base/users'">
                <i class="mianmian mianmian-component"></i>
                <span>用户</span>
              </el-menu-item>
              <el-menu-item :index="'/base/menus'">
                <i class="mianmian mianmian-component"></i>
                <span>菜单</span>
              </el-menu-item>
              <el-menu-item :index="'/base/permissions'">
                <i class="mianmian mianmian-component"></i>
                <span>权限</span>
              </el-menu-item>
              <el-menu-item :index="'/base/logs'">
                <i class="mianmian mianmian-component"></i>
                <span>日志</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="'/companys/list'">
            <i class="mianmian mianmian-peoples"></i>
            <span>
              <span>企业管理</span>
            </span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">
              <i class="mianmian mianmian-form"></i>
              <span>题库管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="'/questions/list'">
                <i class="mianmian mianmian-component"></i>
                <span>基础题库</span>
              </el-menu-item>
              <el-menu-item :index="'/questions/choice'">
                <i class="mianmian mianmian-component"></i>
                <span>精选题库</span>
              </el-menu-item>
              <el-menu-item :index="'/questions/new'">
                <i class="mianmian mianmian-component"></i>
                <span>试题录入</span>
              </el-menu-item>
              <el-menu-item :index="'/questions/randoms'">
                <i class="mianmian mianmian-component"></i>
                <span>组题列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="mianmian mianmian-table"></i>
              <span>学科管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="'/subjects/list'">
                <i class="mianmian mianmian-component"></i>
                <span>学科</span>
              </el-menu-item>
              <el-menu-item :index="'/subjects/directorys'">
                <i class="mianmian mianmian-component"></i>
                <span>目录</span>
              </el-menu-item>
              <el-menu-item :index="'/subjects/tags'">
                <i class="mianmian mianmian-component"></i>
                <span>标签</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="'/articles/list'">
            <i class="mianmian mianmian-component"></i>
            <span>
              <span>面试技巧</span>
            </span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主题 -->
      <el-main class="main-container">
        <router-view />
        <div class="bottom">
          <p>
            <i class="mianmian mianmian-github"></i>
          </p>
          <p>
            Copyright <i class="mianmian mianmian-copyright">2019</i>
          </p>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { profile } from '@/api/user'

export default {
  name: 'HomeIndex',
  props: {},
  components: {},
  data () {
    return {
      color: '#409EFF',
      sreachValue: '',
      isSreach: false, // 控制搜索表单显示与隐藏
      userProfile: {}
    }
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await profile()
        // console.log(data)
        this.userProfile = data
        // this.$message.success('获取用户数据成功')
      } catch (err) {
        this.$message('获取用户数据失败')
      }
    },
    onCommand (command) {
      // console.log(command)
      if (command === 'main') {
        this.$router.push('/dashboard')
      } else {
        this.$store.commit('getUser', null)
        this.$router.push('/login')
      }
    },
    sreach () {
      // console.log(this.$refs.sreach.$refs.input)
      this.isSreach = true
      this.$nextTick(() => {
        this.$refs.sreach.$refs.input.focus()
      })
    },
    onBlur () {
      this.isSreach = false
    }
  },
  created () {
    this.loadUserProfile()
  }
}
</script>

<style lang='less' scoped>
.home-container {
  height: 100%;
  .header-container {
    padding-right: 0px;
    display: flex;
    background: linear-gradient(90deg, #1493fa, #01c6fa);
    align-items: center;
    justify-content: space-between;
    .header-left {
      display: flex;
      align-items: center;
      .sidebar-logo {
        width: 180px;
        height: 56px;
        display: flex;
        align-items: center;
      }
      .el-icon-s-fold {
        padding: 0 10px;
        color: #fff;
      }
      .panel-text {
        font-size: 14px;
        color: #fff;
        margin-left: 10px;
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      .el-input {
        width: 200px;
      }
      .mr-10 {
        margin-right: 10px;
        margin-left: 5px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .asider-container {
    width: 180px !important;
    background-color: rgb(255, 255, 255);
  }
  .main-container {
    background-color: rgb(240, 240, 240);
    .bottom {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p,
      i {
        margin: 14px 0 0 0;
        font-size: 14px;
        color: rgb(156, 156, 156);
      }
    }
  }
  .el-menu-item:hover {
    background: -webkit-linear-gradient(
      left,
      rgb(35, 150, 250),
      rgb(45, 202, 248)
    );
    color: #fff;
  }
  .el-submenu__title {
    background-color: rgb(240, 240, 240) !important;
  }
  i {
    color: rgb(47, 48, 50);
    margin-right: 16px;
    font-size: 14px;
  }
}
</style>
