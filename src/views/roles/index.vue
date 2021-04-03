<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button
            type="primary"
            @click="showAddRoleDialog"
          >
            添加角色
          </el-button>
        </el-col>
      </el-row>

      <el-table
        :data="rolesList"
        style="width: 100%"
        border
        stripe
      >
        <!-- 展开列 -->
        <el-table-column
          type="expand"
        >
          <template #default="slotProps">
            <!-- 渲染一阶权限 -->
            <el-row
              v-for="(item1, index1) in slotProps.row.children"
              :key="item1.id"
              :class="['border-bottom', index1 === 0 ? 'border-top' : '', 'vcenter']"
            >
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(slotProps.row, item1.id)"
                >
                  {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right" />
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(item2, index2) in item1.children"
                  :key="item2.id"
                  :class="[ index2 === 0 ? '' : 'border-top', 'vcenter']"
                >
                  <!-- 渲染二级权限 -->
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(slotProps.row, item2.id)"
                    >
                      {{ item1.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right" />
                  </el-col>
                  <!-- 渲染三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="removeRightById(slotProps.row, item3.id)"
                    >
                      {{ item1.authName }}
                    </el-tag>
                  </el-col>
                </el-row>

              </el-col>
            </el-row>
            <!-- <pre>
              {{ slotProps.row }}
            </pre> -->
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="#"
        />
        <el-table-column
          label="角色名称"
          prop="roleName"
        />
        <el-table-column
          label="角色描述"
          prop="roleDesc"
        />
        <el-table-column
          label="操作"
          width="300px"
        >
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditRightDialog(scope.row.id)"
            >编辑</el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeRoleById(scope.row.id)"
            >删除</el-button>
            <!-- 分配权限按钮 -->
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="handleSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 角色权限设置对话框 -->
      <!-- :before-close="handleClose" -->
      <el-dialog
        title="分配权限"
        :visible.sync="rightDialogVisible"
        width="50%"
        @close="handleClose"
      >
        <el-tree
          ref="treeRef"
          :data="rightsTreeList"
          :props="treeProps"
          :default-checked-keys="defKeys"
          node-key="id"
          show-checkbox
          default-expand-all
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="rightDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import {
  getRolesListApi,
  deleteRightApi,
  allotRightApi
} from '@/api/roles'
import {
  getRightsList
} from '@/api/rights'
export default {
  name: 'Roles',
  data() {
    return {
      // 所有角色列表数据
      rolesList: [],
      // 控制分配权限对话框的显示与隐藏
      rightDialogVisible: false,
      // 所有权限的数据
      rightsTreeList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点Id值数组
      defKeys: [105, 116],
      // 当前即将分配权限的角色id
      roleId: ''
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 获取所有角色的列表
    async getRolesList() {
      const result = await getRolesListApi()
      this.rolesList = result.data
      console.log(result)
    },
    showAddRoleDialog() {

    },
    // 根据Id删除对应的权限
    async removeRightById(role, rightId) {
      console.log(role)
      const confirmResult = await this.$alert('此操作将永久删除该权限，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const result = await deleteRightApi(role.id, rightId)

      if (result.meta.status !== 200) {
        this.$message.error('删除权限失败')
      }
      console.log(result)
      role.children = result.data
    },
    // 展示分配权限的对话框
    async handleSetRightDialog(role) {
      this.roleId = role.id
      const result = await getRightsList('tree')
      if (result.meta.status !== 200) {
        return this.$message.error('获取权限数据失败！')
      }
      // 把获取到的权限数据保存到 data 中
      this.rightsTreeList = result.data
      console.log(result)

      // 递归获取三级节点的Id
      this.getLeafKeys(role, this.defKeys)
      this.rightDialogVisible = true
    },
    // 通过递归的形式，获取角色下所有三级权限的id，并保存到 defKeys 数组中
    getLeafKeys(node, arr) {
      // 如果当前 node 节点不包含 children 属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },
    handleClose() {
      this.defKeys = []
    },
    // 点击为角色分配权限
    async allotRights() {
      const treeRef = this.$refs.treeRef
      const keys = [
        ...treeRef.getCheckedKeys(),
        ...treeRef.getHalfCheckedKeys()
      ]
      console.log(keys)

      const keysString = keys.join(',')
      const data = { rids: keysString }

      const result = await allotRightApi(this.roleId, data)
      if (result.meta.status !== 200) {
        return this.$message.error('分配权限失败！')
      }

      this.$message.success('分配权限成功！')

      this.getRolesList()

      this.rightDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 7px;
}

.border-top {
  border-top: 1px solid #eee;
}

.border-bottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}

</style>
