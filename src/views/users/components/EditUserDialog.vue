<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="50%"
    :before-close="handleUserDialogClose"
  >
    <!-- 内容主体区域 -->
    <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="用户名"
        :prop="isAdd ? username : ''"
      >
        <el-input
          v-model="userForm.username"
          :disabled="!isAdd"
        />
      </el-form-item>
      <el-form-item
        v-if="isAdd"
        label="密码"
        prop="password"
      >
        <el-input
          v-model="userForm.password"
          type="password"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="userForm.email"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="userForm.mobile"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleUserDialogClose">取 消</el-button>
      <el-button
        v-if="isAdd"
        type="primary"
        @click="handleAddUser"
      >确 定</el-button>
      <el-button
        v-if="!isAdd"
        type="primary"
        @click="handleEditUserInfo"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

import {
  addUser,
  getUserById,
  updateUserById
} from '@/api/users'
export default {
  name: 'EditUserDialog',
  props: {
    id: {
      type: Number,
      default: 0
    },
    visible: {
      type: Boolean,
      default: false
    },
    // 编辑类型，有添加用户与编辑用户两种
    type: {
      type: String,
      default: 'add' // 'edit'
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return {
      addUserDialogVisible: false,
      // 添加用户表单数据
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户表单数据验证规则
      userFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: blur }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isAdd() {
      return this.type === 'add'
    },
    title() {
      return this.isAdd ? '添加用户' : '编辑用户'
    }
  },
  created() {
    this.setData()
  },
  methods: {
    async setData() {
      if (this.type !== 'add') {
        const result = await getUserById(this.id)
        this.userForm = result.data
        console.log(result)
      }
    },
    handleUserDialogClose() {
      console.log(this.$refs)
      this.$refs.userFormRef.resetFields()
      this.$emit('closeDialog')
    },
    // 点击确定按钮 添加用户
    handleAddUser() {
      this.$refs.userFormRef.validate(async valid => {
        if (!valid) return
        console.log(this.userForm)
        const result = await addUser(this.userForm)
        if (result.meta.status !== 201) {
          return this.$message.error(`添加用户失败！`)
        }
        this.$message.success('添加用户成功')
        this.$emit('closeAndGet')
        // this.addUserDialogVisible = false
        // this.getUsers()
        console.log(result)
      })
    },
    handleEditUserInfo() {
      this.$refs.userFormRef.validate(async valid => {
        if (!valid) return
        const result = await updateUserById(this.userForm)
        if (result.meta.status !== 200) {
          return this.$message.error(`更新用户信息失败！`)
        }
        this.$message.success('更新用户信息成功！')
        this.$emit('closeAndGet')
      })
    }
  }
}
</script>
