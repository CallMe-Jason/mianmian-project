<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 表单区域 -->
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        class="login-form"
      >
        <div class="title-container">
          <img class="logo" src="~@/assets/logo1.png" alt="" />
          <span>黑马面面</span>
          <span>用户登录</span>
          <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
              {{ lang === "zh" ? "中文" : "English"
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :disabled="lang === 'zh'" command="zh"
                >中文</el-dropdown-item
              >
              <el-dropdown-item :disabled="lang === 'en'" command="en"
                >English</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model.trim="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-unlock"
            v-model.trim="loginForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submit-btn"
            :loading="isLoading"
            type="primary"
            @click="submitForm"
            >{{ $t("login.logIn") }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { sha256 } from 'js-sha256'
import { mapState } from 'vuex'

export default {
  name: 'Login',
  components: {},
  props: {},
  data () {
    // 自定义邮箱验证
    const checkEmail = (rule, value, callback) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的邮箱'))
    }
    return {
      loginForm: {
        username: 'root@admin.com',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      isLoading: false
    }
  },
  watch: {},
  computed: {
    ...mapState(['lang'])
  },
  methods: {
    submitForm () {
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return false

        this.isLoading = true
        // console.log(md5(this.loginForm.password))
        try {
          // this.loginForm.password = sha256(this.loginForm.password)
          // console.log(this.loginForm.password)
          const form = { ...this.loginForm }
          form.password = sha256(form.password)

          const { data } = await login(form)
          // console.log(data)
          this.$store.commit('getUser', data)
          this.$store.commit('setPathState', '/dashboard')
          this.$router.push('/dashboard')
          this.$message.success('登录成功')
        } catch (err) {
          this.$message('登录失败，请稍后重试！')
        }

        this.isLoading = false
      })
    },

    handleCommand (command) {
      // console.log(command)
      this.$i18n.locale = command
      this.$store.commit('changeLang', command)
    }
  },
  created () { },
  mounted () { }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background: url("~@/assets/bg.2f46505a.jpg") no-repeat;
  background-size: cover;
  .login-box {
    height: 100%;
    background: url("~@/assets/logingBg.989212c0.png") no-repeat center right;
  }

  .login-form {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 20%;
    width: 520px;
    background-color: #f5f5f5;
    padding: 35px 35px 15px 35px;
    transform: translateY(-50%);
    /deep/ .el-input {
      height: 47px;
      .el-input__inner {
        height: 47px;
        padding: 0 50px;
      }
    }
    .title-container {
      padding-bottom: 15px;
      display: flex;
      align-items: center;
      .logo {
        vertical-align: middle;
      }
      span {
        padding: 0 10px;
        font-size: 22px;
      }
      .el-dropdown {
        cursor: pointer;
        position: absolute;
        right: 10px;
        .el-dropdown-link {
          font-size: 14px;
        }
      }
    }
    .submit-btn {
      width: 100%;
      /deep/ span {
        font-size: 22px;
      }
    }
    /deep/ .el-input__prefix {
      padding: 2px 5px 0px 10px;
      font-size: 16px;
    }
  }
}
</style>
