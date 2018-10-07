import createActionList from '@common/create/element/action-list';

export default {
  search: [
    {
      label: '角色名称',
      prop: 'name'
    },
    {
      type: 'action-list',
      class: 'operation-action-list',
      actionList: [
        {
          label: '搜索',
          icon: 'el-icon-search',
          action: 'loadDataTable',
          authId: 'system-auth-role-search'
        },
        {
          label: '新建',
          icon: 'el-icon-edit',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'system-auth-role-create'
        },
        {
          label: '删除',
          icon: 'el-icon-delete',
          type: 'danger',
          action: 'deleteSelection',
          authId: 'system-auth-role-delete'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/admin/role',
    delete: {
      url: '/v1/manage/admin/role/delete',
      method: 'post',
      isArray: true,
      deleteByKey: 'id'
    },
    checkbox: true,
    columns: [
      {
        label: '角色',
        prop: 'name'
      },
      {
        label: '权限',
        prop: 'code'
      },
      {
        label: '操作',
        render(h, item, model) {
          return createActionList.call(
            this,
            h,
            {
              actionList: [
                {
                  label: '配置',
                  type: 'primary',
                  size: 'small',
                  icon: 'el-icon-edit',
                  action(model) {
                    this.$router.push({
                      path: '/system/auth/role/config',
                      query: { id: model.id }
                    });
                  },
                  authId: ''
                }
              ]
            },
            model
          );
        },
        width: 200
      }
    ]
  },
  addDialog: {
    title: '新建角色权限',
    saveURL: '/v1/manage/admin/role',
    items: [
      {
        label: '角色',
        prop: 'name',
        rules: [{ required: true, message: '请输入角色', trigger: 'blur' }]
      },
      {
        label: '角色编码',
        prop: 'code',
        rules: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
      }
    ]
  }
};
