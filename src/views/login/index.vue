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
          <el-button class="submit-btn" type="primary" @click="submitForm"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { sha256 } from 'js-sha256'

export default {
  name: 'login',
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
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    submitForm () {
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return console.log(1111111)

        // console.log(md5(this.loginForm.password))
        try {
          // this.loginForm.password = sha256(this.loginForm.password)
          // console.log(this.loginForm.password)
          const form = { ...this.loginForm }
          form.password = sha256(form.password)
          const { data } = await login(form)
          // console.log(data)
          this.$store.commit('getUser', data)
          this.$router.push('/home')
          this.$message.success('登录成功')
        } catch (err) {
          this.$message('登录失败，请稍后重试！')
        }
      })
    }
  },
  created () {
    console.log(this.$store.state.user)
  },
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
      .logo {
        vertical-align: middle;
      }
      span {
        padding: 0 10px;
        font-size: 22px;
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
