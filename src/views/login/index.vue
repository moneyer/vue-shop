<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/logo.png" alt="avatar">
      </div>
      <!-- 登录表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="iconfont icon-3702mima"
          />
        </el-form-item>
        <!-- 登录与重置按钮 -->
        <el-form-item class="login_buttons">
          <el-button
            type="primary"
            @click="handleLogin"
          >登录
          </el-button>
          <el-button
            type="info"
            @click="handleResetForm"
          >重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api/login.js'
import { setToken } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      // 表单数据
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单数据验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击登录按钮进行登录
    handleLogin() {
      const loginFormRef = this.$refs.loginFormRef
      loginFormRef.validate(async valid => {
        if (!valid) return
        const result = await loginApi(this.loginForm)
        if (result.meta.status !== 200) {
          this.$message.error('登录失败')
          // console.log('登录失败')
          return
        }
        this.$message.success('登录成功')
        setToken(result.data.token)
        this.$router.push('/home')
      })
    },
    // 点击重置按钮 重置登录表单
    handleResetForm() {
      const loginFormRef = this.$refs.loginFormRef
      loginFormRef.resetFields()
    }
  }

}
</script>

<style lang="scss" scoped>

$bg: #2b4b6b;

.login_container{
  min-width: 100%;
  width: 100%;
  height: 100%;
  background-color: $bg;
  overflow: hidden;
}

.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img{
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.login_buttons{
  display: flex;
  justify-content: flex-end;
}

</style>
