<template>
  <el-container class="home-container">
    <!-- 头部 -->
     <el-header class="header-container">
        <!-- 头部左边区域 -->
        <div class="header-left">
          <div class="sidebar-logo">
            <img src="~@/assets/logo1.png" alt="" v-if="isCollapse" />
            <img src="~@/assets/logo2.png" alt="" v-else />
          </div>
          <i class="mianmian mianmian-menu-fold" @click='showMaxAside' v-if="isCollapse"></i>
          <i class="mianmian mianmian-menu-unfold" @click='showMinAside' v-else></i>
        </div>
        <div class="header-right">
          <el-tooltip effect="dark" content="站内搜索" placement="bottom">
            <i class="el-icon-search mr-10" @click="sreach"></i>
          </el-tooltip>
          <el-input
            v-if="isSreach"
            v-model="sreachValue"
            placeholder="请输入内容"
            ref="sreach"
            @blur="onBlur"
          ></el-input>

          <el-tooltip effect="dark" content="全屏" placement="bottom">
            <i class="el-icon-full-screen mr-10"></i>
          </el-tooltip>
          <!-- 颜色选择器 -->
          <el-tooltip effect="dark" content="换肤" placement="bottom">
            <el-color-picker class="mr-10" v-model="color"></el-color-picker>
          </el-tooltip>

          <!-- 下拉菜单 -->
          <el-dropdown class="mr-10" @command="onCommand">
            <span class="el-dropdown-link">
              {{ userProfile.name
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="main">首页</el-dropdown-item>
              <el-dropdown-item divided command="quit"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
    <el-container>
      <!-- 左侧 -->
      <el-aside :width="isCollapse ? '50px' : '180px'" class="asider-container">
        <el-menu unique-opened :router="true" :default-active="artice" :collapse='isCollapse' :collapse-transition='false'>
          <el-menu-item :index="'/dashboard'" @click="saveNavState('/dashboard')" :class="artice === '/dashboard' || artice === null ? 'activeItem' : ''" ref="/dashboard">
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
              <el-menu-item :index="'/base/users'" @click="saveNavState('/base/users')" :class="artice === '/base/users' ? 'activeItem' : ''" ref="/base/users">
                <i class="mianmian mianmian-component"></i>
                <span>用户</span>
              </el-menu-item>
              <el-menu-item :index="'/base/menus'" @click="saveNavState('/base/menus')" :class="artice === '/base/menus' ? 'activeItem' : ''" ref="/base/menus">
                <i class="mianmian mianmian-component"></i>
                <span>菜单</span>
              </el-menu-item>
              <el-menu-item :index="'/base/permissions'" @click="saveNavState('/base/permissions')" :class="artice === '/base/permissions' ? 'activeItem' : ''" ref="/base/permissions">
                <i class="mianmian mianmian-component"></i>
                <span>权限</span>
              </el-menu-item>
              <el-menu-item :index="'/base/logs'" @click="saveNavState('/base/logs')" :class="artice === '/base/logs' ? 'activeItem' : ''" ref="/base/logs">
                <i class="mianmian mianmian-component"></i>
                <span>日志</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="'/companys/list'" @click="saveNavState('/companys/list')" :class="artice === '/companys/list' ? 'activeItem' : ''" ref='/companys/list'>
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
              <el-menu-item :index="'/questions/list'" @click="saveNavState('/questions/list')" :class="artice === '/questions/list' ? 'activeItem' : ''" ref="/questions/list">
                <i class="mianmian mianmian-component"></i>
                <span>基础题库</span>
              </el-menu-item>
              <el-menu-item :index="'/questions/choice'" @click="saveNavState('/questions/choice')" :class="artice === '/questions/choice' ? 'activeItem' : ''" ref="/questions/choice">
                <i class="mianmian mianmian-component"></i>
                <span>精选题库</span>
              </el-menu-item>
              <el-menu-item :index="'/questions/new'" @click="saveNavState('/questions/new')" :class="artice === '/questions/new' ? 'activeItem' : ''" ref="/questions/new">
                <i class="mianmian mianmian-component"></i>
                <span>试题录入</span>
              </el-menu-item>
              <el-menu-item :index="'/questions/randoms'" @click="saveNavState('/questions/randoms')" :class="artice === '/questions/randoms' ? 'activeItem' : ''" ref="/questions/randoms">
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
              <el-menu-item :index="'/subjects/list'" @click="saveNavState('/subjects/list')" :class="artice === '/subjects/list' ? 'activeItem' : ''" ref="/subjects/list">
                <i class="mianmian mianmian-component"></i>
                <span>学科</span>
              </el-menu-item>
              <el-menu-item :index="'/subjects/directorys'" @click="saveNavState('/subjects/directorys')" :class="artice === '/subjects/directorys' ? 'activeItem' : ''" ref="/subjects/directorys">
                <i class="mianmian mianmian-component"></i>
                <span>目录</span>
              </el-menu-item>
              <el-menu-item :index="'/subjects/tags'" @click="saveNavState('/subjects/tags')" :class="artice === '/subjects/tags' ? 'activeItem' : ''" ref="/subjects/tags">
                <i class="mianmian mianmian-component"></i>
                <span>标签</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="'/articles/list'" @click="saveNavState('/articles/list')" :class="artice === '/articles/list' ? 'activeItem' : ''" ref="/articles/list">
            <i class="mianmian mianmian-component"></i>
            <span>
              <span>面试技巧</span>
            </span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主题 -->
      <el-main class="main-container" :class="isCollapse ? 'maxWidth' : 'minWidth'">
        <div class="tag">
          <el-button v-for="tag in tagList" :key="tag.path" :type="tag.type" class="tagbc" :class="isActive(tag)? 'active' : ''" @click.prevent="asd(tag)" ref='tag'>
              {{tag.title}}
              <span class="el-icon-close" @click="deleteTag(tag, tagList)"></span>
          </el-button>
        </div>
        <!-- <el-card>123</el-card> -->
        <!-- <a href="../../../public/index.html" target="fm">123</a> -->
        <!-- <iframe name="fm" src="" frameborder="0"> -->
          <!-- 123 -->
          <router-view />
        <!-- </iframe> -->
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
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',
  props: {},
  components: {},
  data () {
    return {
      color: '#409EFF',
      sreachValue: '',
      isSreach: false, // 控制搜索表单显示与隐藏
      userProfile: {},
      artice: '',
      isCollapse: false
    }
  },
  computed: {
    ...mapState(['tagList', 'nextItem'])
  },
  watch: {
    $route () {
      // console.log('监听路由变化', this.$route)
      this.$store.commit('addTag', this.$route)
    }
  },
  provide: function () {
    return {
      isCollapse: this.isCollapse
    }
  },
  methods: {
    // 依赖注入
    showMinAside () {
      this.isCollapse = true
    },
    showMaxAside () {
      this.isCollapse = false
    },
    asd (tag) {
      // console.log(tag.path, '点击的path')
      // console.log(this.$refs, 'ref')
      const con = this.$refs
      // console.log(con, 'nadao')
      Object.keys(con).forEach(function (k) {
        // console.log(k)
        if (tag.path === k) {
          // console.log(con[k], '拿到！')
          con[k].$el.click()
        }
      })
      // this.$refs.menu.$children[0].$el.click()
    },
    // 判断选中状态
    isActive (tag) {
      // console.log(tag, '草原')
      // this.tagActive = tag.path
      return tag.path === this.$route.path
    },
    // 删除标签
    deleteTag (tag, tagList) {
      this.$store.commit('deleteTag', tag)
      // console.log(tagList[tagList.length - 1].path, '我是一只鱼')
      // console.log(tag.path, '删除的路径')
      // console.log(tagList, '大数据')
      // console.log(tagList[tagList.length - 1].path, '数组最后一个数据')
      // console.log(this.nextItem, '1231312')
      // if (tag.path === tagList[tagList.length - 1].path) {
      // console.log('有效')
      // const ion = tagList[tagList.length - 1].path
      // console.log(this.tagList.indexOf(tag), '000000000')
      if (this.isActive(tag)) {
        const con = this.$refs
        const ion = this.nextItem
        // console.log(con, 'asdad', ion, '1213')
        Object.keys(con).forEach(function (k) {
          // console.log(ion.path, 'hahah', k, 'k')
          if (ion.path === k) {
            // console.log(con[k], '1231231')
            con[k].$el.click()
          }
        })
      }
      // console.log(this.tagList, '数组')
      // console.log(tag, '删除')
      // }
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    // 保存路由
    saveNavState (active) {
      window.sessionStorage.setItem('activePath', active)
      this.artice = active

      // console.log(window.sessionStorage.getItem('activePath'))
      // if (this.dynamicTags.indexOf(this.$route.meta.name) === -1) {
      //   this.dynamicTags.push(this.$route.meta.name)
      // }
      // this.dynamicTags.push(this.$route.meta.name)
      // console.log(this.$route.meta.name)
      // window.sessionStorage.setItem('tag', JSON.stringify(this.dynamicTags))
      // console.log(this.dynamicTags)
    },
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
    this.artice = window.sessionStorage.getItem('activePath')
    // this.dynamicTags = window.sessionStorage.getItem('tag')
    // console.log(this.artice, '1231')
    // this.tagList.push({
    //   name: 'dashboard',
    //   path: '/dashboard',
    //   title: '数据概览'
    // })
  }
}
</script>

<style lang='less' scoped>
.mianmian-menu-fold {
  margin-left: -120px;
}
.maxWidth {
  padding-top: 90px;
  margin-left: 50px
}
.minWidth {
  padding-top: 90px;
  margin-left: 180px;
}
.active {
  background-color: rgb(35, 150, 247);
  color: #fff!important;
}
.tag {
  .tagbc {
    // width: 50px;
    // box-shadow: 2px 2px 2px #888888;
    // background-color: rgb(35, 150, 247);
    // background-color: #fff;
    border: 1px solid #ccc;
    margin: 0 5px;
    padding: 0 5px;
    text-decoration: none;
    color: #000;
    font-size: 12px;
    // border: 1px solid #000;
    height: 26px;
    line-height: 26px;
    /deep/ .el-icon-close {
      margin-left: 10px;
      color: #000!important;
    }
    /deep/ .el-icon-close:hover {
      background-color: rgb(156, 156, 156);
      border-radius: 50%;
    }
  }
  width: 100%!important;
  box-shadow: 5px 5px 5px #888888;
  margin-top: -20px;
  margin-left: -20px;
  margin-bottom: 15px;
  // margin-right: 10px;
  padding: 0 20px;
  width: 1366px;
  background-color: #fff;
  height: 34px;
  display: flex;
  align-items: center;
  .el-tag {
    cursor: pointer;
    border-radius: 0px;
    background-color: rgb(35, 150, 247);
    height: 26px;
    color: #fff;
    text-align: center;
    line-height: 26px;
    /deep/ .el-icon-close {
      margin-left: 10px;
      color: #fff!important;
    }
  }
}
.bgcActive {
  background-color: red;
}
.home-container {
  height: 100%;
 .header-container {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    padding-right: 0px;
    display: flex;
    background: linear-gradient(90deg, #1493fa, #01c6fa);
    align-items: center;
    justify-content: space-between;
    height: 70px!important;
    .header-left {
      display: flex;
      align-items: center;
      .sidebar-logo {
        width: 180px;
        height: 56px;
        display: flex;
        align-items: center;
      }
      .mianmian{
        cursor: pointer;
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
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgb(255, 255, 255);
  }
  .main-container {
    overflow-x: hidden!important;
    background-color: rgb(240, 240, 240);
    .bottom {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p, i {
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
    background-color: rgb(240, 240, 240)!important;
  }
  i {
    color: rgb(47, 48, 50);
    margin-right: 16px;
    font-size: 14px;
  }
  .activeItem {
    background: -webkit-linear-gradient(
      left,
      rgb(35, 150, 250),
      rgb(45, 202, 248)
    );
    color: #fff;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
}
</style>
