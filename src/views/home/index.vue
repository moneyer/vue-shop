<template>
  <div>
    <h1>home</h1>
    <el-button
      type="info"
      @click="handleLogout"
    >
      退出
    </el-button>
  </div>
</template>

<script>
import { removeToken } from '@/utils/auth'
export default {
  name: 'Home',
  methods: {
    handleLogout() {
      removeToken()
      this.$router.push('/login')
    }
  }
}
</script>
