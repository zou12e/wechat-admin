<template>
  <div class="config-main">
    <el-tree
      :data="treeData"
      :default-expanded-keys="expandedKeys"
      :default-checked-keys="defaultCheckedKeys"
      :props="defaultProps"
      ref="tree"
      node-key="id"
      show-checkbox>
    </el-tree>
    <br/>

    <el-row type="flex" class="operation-container" justify="flex-start">
      <el-col :span="3">
        <el-button type="primary" @click="submitForm()">确定</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="danger" @click="handleCancel">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getRolePrivileges, postRolePrivileges } from '@common/modules/system/services';

export default {
  data() {
    return {
      treeData: [],
      expandedKeys: [],
      defaultCheckedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  async mounted() {
    let id = this.$route.query.id;
    const data = await getRolePrivileges(id);
    const treeData = [];
    const expandedKeys = [];
    const defaultCheckedKeys = [];
    // 显示按钮
    const createChildren = (childs, privileges, parantKey) => {
      if ((!childs || childs.length === 0) && (!privileges || privileges.length === 0)) {
        return;
      }
      let finallyData = childs;
      let labelProps = 'name';
      let isMenu = false;
      if (!(childs && childs.length > 0)) {
        finallyData = privileges;
        isMenu = true;
        labelProps = 'description';
      }
      const result = [];
      finallyData.map(item => {
        const key = `${parantKey}-${item.id}`;
        if (item.own === 1) {
          defaultCheckedKeys.push(key);
        }
        result.push({
          isMenu,
          id: key,
          value: item.id,
          label: item[labelProps],
          children: createChildren(item.childs, item.privileges, key)
        });
      });
      return result;
    };

    data.map((item) => {
      const {id, name, childs, privileges} = item;
      const module = {
        id,
        label: name,
        children: createChildren(childs, privileges, id)
      };
      treeData.push(module);
      expandedKeys.push(id);
    });

    this.treeData = [{
      id: 'all',
      label: '全部',
      children: treeData
    }];
    this.expandedKeys = expandedKeys;
    this.defaultCheckedKeys = defaultCheckedKeys;
  },
  methods: {
    async submitForm() {
      const checkData = this.$refs.tree.getCheckedNodes();
      if (!checkData || checkData.length === 0) {
        this.$notify({
          title: '错误',
          message: '请选择要开启的权限',
          type: 'error',
          duration: 2000
        });
        return;
      }
      const checkMenu = checkData.filter(formitem => formitem.isMenu);
      if (!checkMenu || checkMenu.length === 0) {
        this.$notify({
          title: '错误',
          message: '请选择要开启的权限',
          type: 'error',
          duration: 2000
        });
        return;
      }
      const id = this.$route.query.id;
      await postRolePrivileges(id, checkMenu.map(item => item.value));
      this.$notify({
        title: '成功',
        message: '配置权限成功',
        type: 'success',
        duration: 2000
      });
      this.$router.back();
    },
    handleCancel() {
      this.$router.back();
    }
  }
};
</script>
