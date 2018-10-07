import createActionList from '@common/create/element/action-list';

export default {
  search: [
    {
      label: '规则类型',
      prop: 'type'
    },
    {
      label: '规则代码',
      prop: 'code'
    },
    {
      label: '规则名称',
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
          authId: 'system-parameter-search'
        },
        {
          label: '新建',
          icon: 'el-icon-edit',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'system-parameter-create'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/common/admin/config/getList',
    columns: [
      {
        label: '类型',
        prop: 'type',
        minWidth: 100
      },
      {
        label: '规则代码',
        prop: 'code',
        minWidth: 120
      },
      {
        label: '规则名称',
        prop: 'name',
        minWidth: 200
      },
      {
        label: '规则描述',
        prop: 'desc',
        minWidth: 300
      },
      {
        label: '值',
        prop: 'value',
        minWidth: 450
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
                  label: '编辑',
                  type: 'primary',
                  size: 'small',
                  icon: 'el-icon-edit',
                  action: 'openEditDialog',
                  authId: 'system-parameter-edit'
                }
              ]
            },
            model
          );
        },
        fixed: 'right',
        width: 100
      }
    ]
  },
  addDialog: {
    title: '新建配置',
    saveURL: '/v1/manage/common/admin/config/create',
    items: [{
      label: '类型',
      prop: 'type',
      rules: [{ required: true, message: '请输入类型', trigger: 'blur' }]
    }, {
      label: '规则代码',
      prop: 'code',
      rules: [{ required: true, message: '请输入规则代码', trigger: 'blur' }]
    }, {
      label: '规则名称',
      prop: 'name',
      rules: [{ required: true, message: '请输入规则名称', trigger: 'blur' }]
    }, {
      label: '规则描述',
      prop: 'desc',
      rules: [{ required: true, message: '请输入规则描述', trigger: 'blur' }]
    }, {
      label: '值',
      prop: 'value',
      rules: [{ required: true, message: '请输入值', trigger: 'blur' }]
    }]
  },
  editDialog: {
    title: '编辑配置',
    saveURL: '/v1/manage/common/admin/config/update',
    items: [{
      label: '类型',
      prop: 'type',
      rules: [{ required: true, message: '请输入类型', trigger: 'blur' }]
    }, {
      label: '规则代码',
      prop: 'code',
      rules: [{ required: true, message: '请输入规则代码', trigger: 'blur' }]
    }, {
      label: '规则名称',
      prop: 'name',
      rules: [{ required: true, message: '请输入规则名称', trigger: 'blur' }]
    }, {
      label: '规则描述',
      prop: 'desc',
      rules: [{ required: true, message: '请输入规则描述', trigger: 'blur' }]
    }, {
      label: '值',
      prop: 'value',
      rules: [{ required: true, message: '请输入值', trigger: 'blur' }]
    }]
  }
};
