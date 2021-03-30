<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            v-model="queryInfo.query"
            placeholder="请输入内容"
            class="input-with-select"
            clearable
            @clear="getUsers"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsers"
            />
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button
            type="primary"
            @click="showAddUserDialog"
          >添加用户</el-button>
        </el-col>
      </el-row>

      <el-table
        :data="userList"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column
          type="index"
          label="#"
        />
        <el-table-column
          prop="username"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
        />
        <el-table-column
          prop="mobile"
          label="电话"
        />
        <el-table-column
          prop="role_name"
          label="角色"
        />
        <el-table-column
          label="状态"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="handleUserStateChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          width="180px"
        >
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditUserDialog(scope.row.id)"
              />
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.id)"
              />
            </el-tooltip>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="handleSetRole(scope.row)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!-- 添加用户对话框 -->
    <edit-user-dialog
      v-if="dialogVisible"
      :id="editId"
      :visible="dialogVisible"
      :type="editType"
      :data="userData"
      @closeDialog="closeDialog"
      @closeAndGet="closeDialogAndGetUsers"
    />
  </div>
</template>

<script>
import EditUserDialog from './components/EditUserDialog.vue'
import {
  getUserList,
  updateUserState,
  deleteUserById
} from '@/api/users'
export default {
  name: 'Users',
  components: {
    EditUserDialog
  },
  data() {
    return {
      keyword: '',
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      userList: [],
      total: 0,
      dialogVisible: false,
      editType: 'add',
      editId: 0,
      userData: {}
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const result = await getUserList(this.queryInfo)
      if (result.meta.status !== 200) return this.$message.error('获取用户列表失败！')
      this.userList = result.data.users
      this.total = result.data.total
    },
    // 监听 pagesize 改变事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUsers()
    },
    // 监听 newPage 改变事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUsers()
    },
    // 更新用户状态
    async handleUserStateChange(userInfo) {
      const result = await updateUserState(userInfo)
      console.log(result)
    },
    // 显示添加用户窗口
    showAddUserDialog() {
      this.editType = 'add'
      this.dialogVisible = true
    },
    showEditUserDialog(id) {
      this.editType = 'edit'
      this.editId = id
      this.dialogVisible = true
    },
    closeDialog() {
      this.getUsers()
      this.dialogVisible = false
    },
    async removeUserById(id) {
      const confirmResult = await this.$alert('此操作将永久删除该用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const result = await deleteUserById(id)

      if (result.meta.status !== 200) {
        this.$message.error('删除用户失败')
      }
      this.$message.success('删除用户成功')
      this.getUsers()
    },
    handleSetRole() {

    },
    closeDialogAndGetUsers() {
      this.getUsers()
      this.dialogVisible = false
    }
  }
}
</script>
