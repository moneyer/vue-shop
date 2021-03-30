<template>
  <el-container class="home-container">
    <!-- 头部区域  -->
    <el-header>
      <div>
        <img src="../../assets/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>

      <el-button
        type="info"
        @click="handleLogout"
      >
        退出
      </el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 页面侧边栏 -->
      <el-aside :width="isCollapse? '64px' : '200px'">
        <div
          class="toggle-button"
          @click="handleToggleCollapse"
        >|||</div>
        <!-- 侧边栏菜单 -->
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
        >
          <!-- 一级菜单 -->
          <el-submenu
            v-for="item in menuList"
            :key="item.id"
            :index="'/' + item.path"
            @click="handleActivePath('/' + item.path)"
          >
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]" />
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              v-for="secondItem in item.children"
              :key="secondItem.id"
              :index="'/' + secondItem.path"
              @click="handleActivePath('/' + secondItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu" />
                <!-- 文本 -->
                <span>{{ secondItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体区域 -->
      <el-main>
        <!-- 路由占位 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import { getMenuList } from '@/api/menu'
import { removeToken } from '@/utils/auth'
export default {
  name: 'Home',
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 是否折叠
      isCollapse: false,
      activePath: ''
    }
  },
  created() {
    this.getMenu()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    handleLogout() {
      removeToken()
      this.$router.push('/login')
    },
    // 获取左侧菜单列表
    async getMenu() {
      const result = await getMenuList()
      // 处理失败逻辑，后期应该封装到axios的反应拦截上
      if (result.meta.status !== 200) return this.$message.error(result.meta.msg)
      this.menuList = result.data
    },
    // 点击按钮，切换左侧菜单的折叠效果
    handleToggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    handleActivePath(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0px;
  color: #fff;
  font-size: 20px;
  >div{
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 20px;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>
